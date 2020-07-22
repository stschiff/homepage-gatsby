---
title: The Magic of Command Line Interface Design in Haskell
---

Command line tools are often the bread and butter of high performance computing environments, at least for bioinformatics. What is critical in such an environment is the interface between a tool and the outside world, which may consist of connections to user-input or to other tools through pipes. Such command line interfaces are like contracts. The user promises to provide input parameters in the right shape and type, and the tool promises to work with this input the way it is expected to. A breach of contract from the caller may result - at best - in a refusal of the program to run, and at worst in undefined behavior. 

A well-defined command line interface is thus a huge help in ensuring loyalty to contract on the caller's side. More specifically, a well-defined interface exposes to the outside-caller just the right amount of power to control the program. This is more tricky than it sounds: It is not enough to expose dozens of options and flags for the user to set, there also has to be some evaluation logic to ensure the combination of options and flags makes sense! As I hope to be able to convince you in this post, a strict and expressive typing system like in Haskell is a huge help with that. 

There's going to be quite some Haskell code in this post, but don't worry, I'll explain everything to a deep enough level that you can follow along even you've never seen Haskell. My point here is not so much to give a Tutorial on Haskell, but to show you a specific concept of composable command line option parsers. That said, you may find the examples just interesting enough to give Haskell a chance. If you do, I recommend the freely available book and tutorial [Learn You a Haskell for Great Good](http://learnyouahaskell.com).

OK, let's dive in. My toy example in this post will come from the area of bioinformatics. Let's consider a program that reads in a file with a genotype matrix (N individuals genotyped at M sites) and outputs summary statistics for each individual. We're not going to talk about the actual code of this program (perhaps that's left for another blog post to showcase more features of Haskell), but we're focusing only on the Command Line Interface.

## Defining the interface through types

So, let's define a data structure in Haskell that captures all possible options for our program:

```Haskell
data Options = Options {
	missingnessThreshold :: Double,
	verbose :: Bool,
	summaryStat :: SummaryStatSpec,
	inputFormat :: FormatSpec,
	individuals :: IndividualsSpec
}

data SummaryStatSpec = Heterozygosity | SegregatingSites | HardyWeinbergDeviation

data FormatSpec = PlinkFormat FilePath FilePath FilePath | VCFFormat FilePath

data IndividualsSpec = IndividualsByFile FilePath | IndividualsByList [String]

```

OK, so what's going on here? First, we define a record type called `Options`, which has four fields, called `missingnessThreshold`, `verbose`, and so on. Each record has a type. Some types should sound familiar, such as `Double` (a number) or `Bool` (True or False), which here define a missingness cutoff filter (doesn't matter what that exactly is) and a verbosity flag (if `True`, print out tons of extra log messages). The two other types are themselves custom types. `SummaryStatSpec` is a simple enumeration of different values, here representing different genome-wide summary statistics that the user might want to compute for the specified individuals. The settings (`Heterozygosity`, `SegregatingSites` and `HardyWeinbergDeviation`) are separated using the pipe (`|`) operator. A value of type `SummaryStatSpec` can simply be either of these three choices. Similarly, `FormatSpec` defines with two alternatives `PlinkFormat` and `VCFFormat` (separated as above by the pipe operator `|`). However, now we have some additional values defined here. A `PlinkFormat` value is associated with three filenames of type `FilePath`, a standard data type in Haskell which is equivalent to `String`. The alternative, `VCFFormat`, is associated with one filename. This may become clearer with an example:

```Haskell
f :: FormatSpec
f = PlinkFormat "file.geno" "file.snp" "file.ind"

g :: FormatSpec
g = VCFFormat "file.vcf"
```

This would declare `f` to be of type `FormatSpec`, and specifically give it a `PlinkFormat` value with three filenames (Plink-formatted genotype data comes as three files). Similarly, `g` would be also be of type `FormatSpec`, but would have a `VCFFormat` value with one specified filename. So in Haskell we can easily define alternative branches of options at the type level. And the type system enforces these types at compile time. It would be a compiler error if we specify a value of type `FormatSpec` in any other shape as either of these two formats shown above. `PlinkFormat` and `VCFFormat` are called "Constructors" in Haskell. They act like a function that returns a type. Specifically, `PlinkFormat` is a function with three arguments (in Haskell, function arguments are just listed after the function name separated by whitespace), and `VCFFormat` a function with one argument. The equivalent in python would be 

```python
f = PlinkFormat("file.geno", "file.snp", "file.ind")
g = VCFFormat("file.vcf")
```

The final data type in the Options record is `IndividualsSpec`, which again has two alternatives. The first constructor `IndividualsByFile` takes a filename, and specifies that selected individuals should be given in a file (listed with their IDs line by line). The second constructor `IndividualsByList` takes a list of strings, and specifies that individuals are given as a list of strings directly through the command line interface.

OK, let's stop for a second. I hope you can appreciate that this data structure makes it as clear as it can possibly be i) what is needed in terms of program input, and ii) what the options are for various parameters. You will also appreciate that this data structure is already of considerable complexity. It has nested elements, alternatives, custom data types... at the same time I don't think it's unrealistic. I happen to have such interfaces in my programs, and I would argue that many bioinformatics tools have comparably complex interfaces, many even more complex.

So before we now dive into how to parse command line options into this structure, keep in mind that the type system is our friend: It will make sure that our parsing code will result in exactly the right shape for this data structure. We can be fully relaxed when actually coding the main program logic later, because we know that all command-line input is passed - by construction - in the right shape.

## Command line parsers

So clearly, parsing all these elements from the command line as arguments is challenging. For example, in python, using the popular and powerful package [argparse](https://docs.python.org/3/library/argparse.html), we sure can define an interface with command line options that allow for all the data needed to fill our nested data type `Options`, but there wouldn't be much help ensuring those alternatives that we defined above. For example, there wouldn't be any option (to my knowledge) to already ensure at the parsing level that the input file options either come with three files or with one, but not, say, with two or four or so.

In argparse, and many other command line parsers, you can only specify whether a given option is required or optional, and whether the arguments parsed should be accumulated in lists or not. But you can't easily automatically ensure that only one of each alternative, including specific additional arguments is allowed. So you'd end up coding with tons of if-statements making sure that only a specific combination of input choices is given, or you need to specify some logic of ignoring specific options if others are set. For example, you could parse both a filename and a list of strings for the `IndividualsSpec` type and then - say - ignore the list of strings once a filename is given. But that wouldn't make it crystal clear to the user that she has done a mistake in specifying both alternatives simultaneously.  

Haskell has an absolutely beautiful library for this purpose, called [optparse-applicative](https://hackage.haskell.org/package/optparse-applicative). It defines functions to design _composable_ command line option parsers, and it utilizes the power of Haskell's strong type system to help ensuring the correct shapes of the input data structure.

The beauty of composable parsers is that you can create complex parsers for real beasts of data structures as `Options` defined above from much simpler smaller components. So to showcase this composability I'll follow a bottom-up approach here. So let's start with some basics. Here is a command line Parser for the missingness-threshold:

```Haskell
import qualified Options.Applicative as OP

missingnessParser :: OP.Parser Double
missingnessParser = OP.option OP.auto (OP.long "missingness" <>
																	     OP.short 'm' <>
																			 OP.value 0.9 <>
																			 OP.showDefault)
```

First, all names starting with `OP.` are from the `optparse-applicative`-library (as defined by the import statement above). The key idea is that we define a value of datatype `OP.Parser <something>`, which represents a single unit that in the end will parse something from the command line into a value of datatype `<something>`, here a `Double`. The exact definitions here aren't that crucial, but because I see you're curious, here we go: `OP.option OP.auto` just declares a command line option with an automatic string-parser, and some definitions for the actual command line option. `OP.long` and `OP.short` define that this option can be called using either `--missingness 0.283` or with the short form `-m 0.45` (numbers made up to illustrate how to pass an actual value for that option). We also define a default value (0.9) and declare that this default value be shown to the user when she lists all available options.

We can similarly easily define 
```Haskell
verboseParser :: OP.Parser Bool
verboseParser = OP.switch (OP.long "verbose" <> OP.short 'v')
```
where we define this option to be parsed as a switch that can be triggered either using `--verbose` or via `-v`, without any arguments. If the switch is set, parse this option as `True`, if not parse as `False`.

Now it gets interesting. How do we parse a value of type `SummaryStatSpec`? I would like the user to be able to use switches `--heterozygosity` or `--segregatingSites` or `--hardyWeinbergDev`, and to parse these into the respective alternative values. To do this, we first define a parser for each value:

```Haskell
HetParser :: OP.Parser SummaryStatSpec
HetParser = OP.flag' Heterozygosity (OP.long "heterozygosity")

SegSitesParser :: OP.Parser SummaryStatSpec
SegSitesParser = OP.flag' SegregatingSites (OP.long "segregatingSites")

HWParser :: OP.Parser SummaryStatSpec
HWParser = OP.flag' HardyWeinbergDeviation (OP.long "hardyWeinbergDev")
```

This is now where the magic starts: We can compose these three parsers into one using Haskell's applicative operator `<|>`:

```Haskell
SummaryStatParser :: OP.Parser SummaryStatSpec
SummaryStatParser = HetParser <|> SegSitesParser <|> HWParser
```

This will ensure at the type level that only exactly one of these options is valid input! This kind of composition of parsers to build more complex parsers is at the heart of Haskell, and we'll see it again further below. Note that we could have written this much more compact:

```Haskell
SummaryStatParser :: OP.Parser SummaryStatSpec
SummaryStatParser = HetParser <|> SegSitesParser <|> HWParser
  where
	  HetParser = OP.flag' Heterozygosity (OP.long "heterozygosity")
    SegSitesParser = OP.flag' SegregatingSites (OP.long "segregatingSites")
	  HWParser = OP.flag' HardyWeinbergDeviation (OP.long "hardyWeinbergDev")
```

and let Haskell infer types of the three sub-parsers automatically, saving us some boilerplate type declarations.

Moving on, next on the list is parsing a options into a `FormatSpec` type, which is more challenging, because we have two constructore (`PlinkFormat`, and `VCFFormat` which take different arguments). We first deal with `PlinkFormat`:

```Haskell
PlinkFormatParser :: OP.Parser FormatSpec
PlinkFormatParser = PlinkFormat <$> genoParser <*> snpParser <*> indParser
  where
	  genoParser = OP.strOption (OP.long "genoFile")
		snpParser = OP.strOption (OP.long "snpFile")
		indParser = OP.strOption (OP.long "indFile")
```

Here we have made again use of applicative composition, but this time not with the Alternative operator (`<|>`) but operators `<$>` and `<*>`. Remember that the `PlinkFormat` constructor takes three arguments. This is expressed here with this composition `PlinkFormat <$> genoParser <*> snpParser <*> indParser`. This will make sure that all three options (`--genoFile`, `--snpFile` and `--indFile`) need to be given, each with a string (=filename) argument, as declared via `OP.strOption`.

We similarly have a parser for the `VCFFormat` constructor:
```Haskell
VCFFormatParser :: OP.Parser FormatSpec
VCFFormatParser = VCFFormat <$> vcfParser
  where
	  vcfParser = OP.strOption (OP.long "vcfFile")
```

More magic comes in when we now put these two parsers, `PlinkFormatParser` and `VCFFormatParser` together, again via applicative composition:
```Haskell
FormatParser :: OP.Parser FormatSpec
FormatParser = PlinkFormatParser <|> VCFFormatParser
```

Here, `FormatParser` is a single parser for the complex datatype `FormatSpec`, which includes all branching options and correctness of all arguments for each branches. We don't need to write evaluation code for this, the parser will ensure that the input is all type-correct. Magic!










Programming is to a large part about managing complexity. Most programs do complex things, otherwise we wouldn’t need programs for them. How do we typically manage complexity? Well - we divide and conquer. We split the large problem into small parts and then deal with the parts separately. 

When dividing up a problem into smaller parts, we need to make surgical cuts, most often already in the design phase, but sometimes actively: when we notice that a piece of code has become too bloated and unwieldy, we need to tear it apart and divide it into pieces that are easier to manage. What is left are interfaces between the pieces, which in German translates to “Schnittstelle”, which means cut-surface.

Sticking with the German word “Schnittstelle” as a “cut surface” makes the critical nature of this concept a bit clearer than the more positive sounding “interface”. The term “cut surface” suggests destruction before we gain anything. Indeed, when we cut - as depicted in the image above - we lose the coherence of the larger picture. If you don’t have clean and well defined interfaces between the pieces, you’ll not be able to piece them back together. Think of Lego or a jigsaw puzzle: Only because the cut surfaces are shaped in a certain way can we piece them back together to a coherent larger picture. Good code is all about well-defined interfaces!

Interfaces appear internally in a program, when defining functions and classes, but also - and equally important - they appear in relation to the outside world. For example, when we call a program through the command line, we use a command line interface to pass parameters or set input and output files. When our program parses input files, there needs to be a well-defined interface how to parse the textual or binary data of the file into the corresponding data structures in our code. 








