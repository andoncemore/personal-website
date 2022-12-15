---
date: 2022-12
title: BEYOND Spacesuit Interactive
shortDescription: An interactive web experience to browse children's artwork that have been collaged onto a spacesuit 
thumbnail: thumbnail.png
main: true
featuredImage: hero.png
tags: ["2022", "8 Person Team"]
description: >
  The *BEYOND Spacesuit Interactive* is a website created for the [Space for Art Foundation](https://www.spaceforartfoundation.org/) by my team at Moving Labs. The foundation approached our team to create a website where kids could interact with a 3D model of the BEYOND spacesuit, a spacesuit quilted with over 800 pieces of artwork contributed by children in hospitals, refugee centers, orphanages & hospitals around the world. The web experience allows kids to browse and view all the artwork by interacting with a 3D model of the spacesuit and the globe. 
  
  
  My role on this project was as a UX designer creating the early concept wireframes, and as a creative technologist designing, prototyping, and wrangling the data visualization aspects of this project. 
  
  
  *This project was never released, but was fully designed and almost completely developed*
info:
- "[Creative Technology Prototypes](https://sap-prototyping.vercel.app/)"
- "[Spacesuit Photogrammetry Process](https://spacesuit-model.vercel.app/)"

---

### Background

The Space for Art Foundation's BEYOND Spacesuit is one of seven in their Spacesuit Art Project. The artwork used for the BEYOND was collected during the 2 years of the COVID pandemic and features over 800 pieces from children all over the world.

![Images from of kids working on art for the spacesuit art project](./beyond-spacesuit-15.png '#grid-column=left / right')


## The client's goals for the digital experience were to: 1) Inspire a sense of unity and connection across borders 2) Celebrate the work of the contributors to the BEYOND suit 3) Inspire kids to see the connection between space exploration and ecological stewardship

### Concept Development
Each of the client's goals can be seen within the key design concepts in the app. 

#### 1. Inspire a sense of unity and connection across borders

We felt that the opportunity of this website was to show the scope of the project, and show connections across borders. To do this, our initial concepts began with using a globe as an atlas, to visualize where the artworks were being contributed from. 

![Sketch showing a spacesuit and an earth model](./beyond-spacesuit-11.png '#grid-column=wide-left / center')

![Sketch showing a spacesuit highlighted showing an artwork](./beyond-spacesuit-12.png '#grid-column=center / wide-right')

Prototyping different layouts and interaction models: 

<iframe style="border: 2px solid rgba(0, 0, 0, 0.1); grid-column: wide-left / wide-right" width="800" height="600" src="https://sap-prototyping.vercel.app/03-camera-controller" allowfullscreen></iframe>

**Final Designs:**

![Final desigh mockup showing a screen with a spacesuit and earth 3d model](./beyond-spacesuit-10.png '#grid-column=left / right')

1. Artwork from the current continent is highlighted on the spacesuit. 
2. Preview of children’s artwork from the selected continent, giving prominence to the artwork in the application. 
3. Globe automatically rotates in idle state, hinting at the interactive features in the app.

#### 2. Celebrate the work of the contributors to the BEYOND suit.
Highlighting the children's artwork in all three key views of the app (home, spacesuit focused, earth focused)

![Three screens side by side, showing an earth model and a spacesuit model](./beyond-spacesuit-13.png '#grid-column=wide-left / wide-right')

Giving the app a more hand-drawn look and feel, to reflect the style of children's artwork

<iframe style="border: 2px solid rgba(0, 0, 0, 0.1); grid-column: wide-left / wide-right" width="800" height="600" src="https://sap-prototyping.vercel.app/01-drawn-earth" allowfullscreen></iframe>

Accessibility was important from the start, making sure that our website could be accessed by *all* the contributors. This meant:

- having a low bandwith fallback for those that can't load an entire 3D scene
- mobile design
- high contrast, adustable text size, reduce motion
- minimize the amount of text, using iconography as much as possible
- include as many translations of text as possible

![Mobile mockups of the website, showing navigation](./beyond-spacesuit-09.png '#grid-column=left / right')

![Accessibility menu opened on a website](./beyond-spacesuit-14.png '#grid-column=left / right')


#### 3. Inspire kids to see the connection between space exploration and ecological stewardship
A key concept for the client was "Spaceship Earth": understanding earth as a spaceship that we all have to work together to take care of. To communicate this, we created a "vital signs" data visualization feature to connect both the spacesuit and earth as similar life-supporting systems. 

For the earth vital signs mode, we incorporated NASA's GIBS climate datasets into the website. Specifically bringing in precipitation, vegetation, and temperature heat maps into the application.

![Simple sketch of showing vital signs for the earth and spacesuit](./beyond-spacesuit-08.png '#grid-column=wide-left / center')

![Screenshot from figma showing user flows for the data visualization interaction](./beyond-spacesuit-07.png '#grid-column=center / wide-right')

This vital signs mode introduced a new browsing mechanic - instead of seeing countries highlighted by continent, kids could use the slider to highlight countries with similar average "vital signs."

<iframe style="border: 2px solid rgba(0, 0, 0, 0.1); grid-column: wide-left / wide-right" width="800" height="600" src="https://sap-prototyping.vercel.app/06-gibs-slider" allowfullscreen></iframe>

**Final Designs:**

![A globe with a heat map applied to it, and a slider showing up in on the right](./beyond-spacesuit-06.png '#grid-column=wide-left / wide-right')

1. Use the earth vital signs icons to see three different NASA climate datasets as a heatmaps on the globe.
2. The data slider in the sidebar filters countries by their average climate “vital signs,” highlighting similarities between countries beyond their geographic borders. 

![An interface showing a colorful spacesuit, with a vital sign readout, annotated with text](./beyond-spacesuit-05.png '#grid-column=left / right')

1. Buttons to toggle between three different spacesuit vital signs that help communicate how a spacesuit helps keep an astronaut alive. 
2. Readout of the vital sign, along with a simple description and resources to learn more.
3. Highlighting the relationship between spacesuit vital signs and earth vital signs, illustrating the metaphor of “Spaceship Earth”


### Usability Study
We ran a small usability study with kids ages 6-12 to test our navigation pathways on both mobile and desktop. (This effort was led by a different member of the team, but I conducted two of the interviews)

![A person interviewing a kid](./beyond-spacesuit-16.jpeg '#grid-column=left / right')


The results from this usability study gave us confidence to continue with our navigation pattern, but showed us areas where we could improve, for example clarifying how our back and home buttons would work. 

### Final Clickthrough Prototype

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="600" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2Fm1ILXZ2N4Hukd2aEpb1IfN%2FSAP-Clickable-Prototype%3Fpage-id%3D4790%253A86445%26node-id%3D4790%253A86489%26viewport%3D1065%252C791%252C0.11%26scaling%3Dscale-down-width%26starting-point-node-id%3D4790%253A87337" allowfullscreen></iframe>


### Building Tools to Prepare Data

As we moved into the development phase of the project, my role was to use my understanding of the design intent to prepare various datasets for use within the design

#### Identifying Artwork in 3D Space

Working with the 3D developer, I developed a simple react app to tag artworks from our CMS with 3D positions and additional metadata from the 3D model.

![A grid of images on a website with a tooltip open showing numbers](./beyond-spacesuit-04.png '#grid-column=wide-left / wide-right')

![A 3d model painted with pink polka dots](./beyond-spacesuit-03.png '#grid-column=left / right')


#### Generating SVG country outlines

The design of the app called for stylized vector artwork of every country. To assist in the creation of these assets, I created a Figma plugin that converted world bank country border data into the stylized assets we needed. 

![Zoomed in screenshot of an interface, showing a country outline with climate information next to it](./beyond-spacesuit-02.png '#grid-column=left / right')

![Screenshot of Figma interface with country border plugin open](./beyond-spacesuit-01.png '#grid-column=wide-left / wide-right')