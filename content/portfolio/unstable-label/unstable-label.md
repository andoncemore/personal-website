---
date: 2020-04
title: "Unstable Label"
shortDescription: A speculation on alternative approaches to Machine Learning through the design of a data labeling app.
thumbnail: thumbnail.png
main: true
featuredImage: hero.jpg
tags: ["2020", "MFA Thesis Project"]
description: >
 *Unstable Label* is a participatory civic data labeling application that facilitates conversations of how we each see and imagine our neighborhoods differently through the collective creation of an object detection algorithm. 


 This is a speculative design project that critiques contemporary data collection practices for Machine Learning, while also imagining alternative approaches. More than a practical proposal for a new data collection system, *Unstable Label* is a set of ideas, provocations, and critiques that are intended to challenge contemporary practices and creatively imagine new paths forward. 
info:
- "[Process Case Study](/case-studies/design-discovery/)"
- "[Prototype Application](https://unstable-label.glitch.me)"
- "[Project Essay](http://unstable-manual.aditd.me)"
- PRIMER 2020, Emerging Designer 2nd Place Winner
- Exhibited at Abierto Mexicano Diseño 2020
- Exhibited at DeepCity 2021

---

## **Brief:** If machine learning could be interpreted as a form of worldbuilding, how could you use to to generate imaginary worlds?

*(For more details on how this brief emerged as a part of my thesis work, see the [process case study](/case-studies/design-discovery/))*

### Initial Concept

The initial concept uses google street view as a data souce, letting users create imaginary data.

![](./proposal.jpg#grid-column=left / right)

The initial prototype highlighted the main challenge: providing users prompts to help them create label imaginary data. The following variations explored different ways to help users label and create this fictional data. 

![](./variations.png#grid-column=wide-left / wide-right)

Through presentations, critiques and discussions, the most promising idea was some sort of relabeling systems, where users **relabel** existing labels as a way to create new categories

### Developing the Concept

To develop the concept further, I designed and built a functional web-app to run on an iPad. Through the process of designing and building this app, there were four key components that emerged.

![](./included_components.png#grid-column=left / right)

![](./first-prototype-01.png#grid-column=wide-left / wide-right)

One of the key features that was added to this prototype was a way to see a branching tree that showed the relationships between the different categories that were being created. 

![](./first-prototype-04.png#grid-column=left / right)

![](./first-prototype-02.JPG#grid-column=left / center)

![](./first-prototype-03.JPG#grid-column=center / right)

This version of the app was used in a gallery show, in combination with a "workshop" style deconstruction of the relabeling features of the app. The gallery show and presentation provided opportunities for feedback:

- Understanding how legible the concept was to users
- Finding which parts of the process were the most difficult to complete
- Identifying opportunities for new features

![](./gallery-01.jpg#grid-column=wide-left / wide-right)

![](./gallery-02.jpg#grid-column=wide-left / center)

![](./gallery-03.jpg#grid-column=center / wide-right)

### Refining the UI Design

The next round of iterations focused more on the UI design, figuring out how the visual aesthetics of the app could better represent the core concepts.

![](./detailed_design.png#grid-column=left / right)

Some key additions were:
- Letting users draw-free form shapes to create bounding boxes
- Representing the model as a network diagram rather than a hierarchitcal tree
- Introducing a UI with lots of overlapping elements, as a way to visually represent the layered complexity that is often hidden in "simple" labeling tasks.

![](./thumbnail.png#grid-column=wide-left / wide-right)

### Final Design

*For a more detailed look at the final design, and a more in-depth look at the system, visit the [user manual](http://unstable-manual.aditd.me).*

#### System Overview

The left panel of the system allows you to navigate through google street view, finding sites of interest to contribute to the collective machine learning model.

The right panel represents the model, listing all the "data" that has been contributed to the project, featuring not only labels, but also the stories that put them into context. 

![](./Unstable-Label-05.png#grid-column=wide-left / wide-right)

#### Step 1: Local Navigation

Each user contributes from their own local context from within Google Street View or from a physical data collection device. 

![](./Unstable-Label-07.png#grid-column=left / right)

#### Step 2: Creating Categories

- The current machine learning model evaluates the image from your current location, generating labels. 
- You create new categories by relabeling those existing categories. The relabeling process is usually done in a small group. You discuss what the original category makes you think of within your local context. 

![](./final-prototype-01.png#grid-column=left / right)

## This is not about "correcting" the algorithm or making it more "accurate." It's about introducing your locally situated perspective into the dataset

#### Step 3: Drawing Data

Use your personal categories that you’ve just created to annotate other images, creating data. There are two annotation options: label and imagine. You can choose to annotate the image as it currently exists, or as you **wish** it existed. 

![](./final-prototype-02.png#grid-column=left / right)

#### Step 4: Updating the ML Model

Once submitted, the model is retrained using your data, adding your categories into the model. Future contributors may relabel your data, recontexualizing it to their local neighborhoods.

![](./exploring_model_screen.png#grid-column=left / right)

## The end result of this system isn’t a “better” model, but the process of contestation and negotiation that it facilitates, some of which doesn’t happen in the app at all.
