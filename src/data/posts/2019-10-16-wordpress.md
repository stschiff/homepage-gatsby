---
title: Bye bye Wordpress
isBlogPost: True
image: ../images/blog/construction.jpg
---

import Blogfigure from "../../components/blogfigure"

**Update:** *Since the summer of 2020, my website has undergone a further upgrade to [gatsby](https://www.gatsbyjs.org/), another static site generator that builds more heavily on modern javascript frontent development. I love it, and describe the new setup in a new blog post and if you like the snappy-ness of my site, have a look at my github-repository [here](https://github.com/stschiff/homepage-gatsby).*

<Blogfigure relPath="images/blog/construction.jpg" altText="A toy model of a construction site">Image from Pixabay</Blogfigure>

I recently rebuilt my website. I had previously used [Wordpress](https://wordpress.org), and while that was perfect to get started, I soon got annoyed by its relative inflexibility. While Wordpress has a huge community with tons of free templates for nicely designed websites, the templates themselves are often very opinionated in a sense that they encourage certain archetypes, like Blogging sites, or magazine-style sites. Customization is possible, but it comes in the form of plugins (again, thousands are available for free), and the more customization you want, the more plugins you end up using. This at some point makes the whole system a bit bloated, and still not quite right in the end.

The issue with an academic homepage such as mine is that it doesn't quite fit a classical Blogging website, but that I also want support for listing publications, talks, and for presenting my research group. I also want a News sidebar that lists not only recent Blog posts but also recent publications and generally announcements. While all this is _somehow_ possible also with Wordpress, it wasn't fun anymore to play with all these different plugins, and in the end have massive functionality available which overlaps only to a very small extent with what I actually wanted.

There is another thing that annoyed me about Wordpress: It is actually quite slow. The reason is that it creates pages dynamically from a database-backend, in which blog posts, pages and simply all content is stored. I wanted something simpler and faster, and having a dynamic fully-fledged content-management-system as a backend for my personal homepage was simply not something I actually needed.

***

So I switched to a static site generator, namely [hakyll](https://jaspervdj.be/hakyll/). Static site generators have a very different concept from dynamic webpages and content management systems: They create static html pages from various data and content, that you then simply deploy by copying all the resulting HTML files onto a webserver. There are many useful static site generators out there. The most popular ones are [jekyll](https://jekyllrb.com/) (written in Ruby), [pelican](https://blog.getpelican.com/) (written in python), [Hugo](https://gohugo.io/) (written in Go), [gatsby](https://www.gatsbyjs.org/) (written in javascript), and many more. [Hakyll](https://jaspervdj.be/hakyll/) is certainly among the less widely used ones, and it's written in Haskell (which I happen to like!)

All static site generators work a bit similar: You have directories with _content_, such as Blog Posts, pages, images, and style sheets, and you have a program that builds your final html pages to be seen through the webbrowser from that content. In doing so, you can use your content in very customized ways to fill your website's components. For example, as you can see on the right (or below if you're viewing this on your phone), I have a list of news items, which include "New Blog Post" and "New publication" items. These are created automatically from my list of publications and blog posts. So as soon as I write a new post or add a publication, those get not only added to the the respective publication list and list of blog posts, but also appear in the News sidebar. This removed some reduncancy for me, which I had before in my Wordpress site. Within my sidebar and publication lists, I also added the possibility to add images, which I couldn't do before (I'm sure there is a plugin which will get it 80% right).

Moving away from pre-built templates in Wordpress also meant that I had to design my website from scratch using custom style sheets written in CSS. Now, I'm not particularly proud of this design, but it's functional and minimal, and uses only a fraction of CSS commands than what Wordpress or other professionally designed webpages need. So that's good. I _am_ a little proud that I worked out how to make the design of my page _responsive_. This is a term used in Webdesign which refers to the concept of having your design respond to what device you're viewing it through. So if you make your browser window very narrow, you will notice that the design changes slightly, in particular the sidebar will appear below the main body of the site, not to the right of it. The same thing happens on your phone.

Oh, and this webpage is really fast! Since there is no dynamic server-side code to create the page when it's loaded, neither javascript in your browser to be executed, very minimal CSS and html to be loaded only, this site loads _much_ faster than before. 

***

If you're interested in using the template that I've created with Hakyll for your own website, let me know. I currently haven't documented this very well, but the code is all up on [github](https://github.com/stschiff/homepage), and I'm happy to write some documentation if people are interested.