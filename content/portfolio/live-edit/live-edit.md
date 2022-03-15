---
date: 2018-11
title: Live/Edit
shortDescription: Live streaming furniture that produces live video edits based on position in physical and digital space. 
thumbnail: thumbnail.png
main: false
iframe: '<iframe src="https://player.vimeo.com/video/306120648?h=740960b775&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>'
tags: ["2018", "Individual Project"]
description: >
 *Live/Edit* is a design project proposing a room-size piece of furniture that produces live video edits of the streamer based on their physical position and digital activity, both automating and visualizing the camera choreography.  

info:
- Exhibited at ArtCenter MDP WIP Show (2018)

---

### System Overview

1. The prototype uses the HTC Vive to track a streamer's position within a simple wooden frame. 
2. There are seven webcams mounted in different positions on the frame that trigger based on the tracked position of the streamer.
3. Moving the the standing table in the middle of the volume swtiches the livestream to a digital feed, based on the streamer's movement through digital space. 
4. The space is annotated on the floor to communicate the different camera zones to the streamer. 
5. The livestream is projected onto the wall, giving the streamer feedback on the currently active camera angle. 

![Room sized wooden frame with cameras attached to it, annotated with numbers](./live-edit-01.png '#grid-column=wide-left / wide-right')


### Design Details & Questions

The design details within this piece of furniture reflect specific questions I was looking to explore with this piece. 

#### 1. What is the relationship between the streamer and the set?

![Plastic casters screwed onto a wooden frame](./live-edit-03.png '#grid-column=left / right')

The set is usually something that is a fixed space, but within a live-streaming context, the set is often a mobile space and/or a personal one. The wooden frame implies an outline of a static room, but the casters on the frame indicate that the frame itself is a piece of furniture. 

#### 2. What is the interaction between editing algorithm and the streamer?

![A projector sitting on a floor marked up with neon tape](./live-edit-02.png '#grid-column=left / right')

By giving control of the edit to an automated system, the streamer has to use the rules of the algorithm governing that system to take back control of the edit. The projection of the live-stream on the wall is one way for the streamer to learn those rules as they use the furniture. 

#### 3. Does the underlying editing system affect the performance?

![Concrete floor covered in neon tape denoting different zones](./live-edit-04.png '#grid-column=left / right')

The taped floors indicate the different trigger zones of the furniture. By knowing the bounds of these trigger zones, the streamer starts to perform for the edit. 

#### 4. What is the relationship between physical and digital space in the context of live-streaming?

![Laptop sitting on a standing height table in the middle of a room-sized wooden frame](./live-edit-05.png '#grid-column=left / right')

The prototype centers around a desk with a laptop sitting on it. Moving towards the table switches the trigger system from a spatial one to a digital one. Live-streaming is often a blend between virtual and physical space, and this was one way to explore the transitions between those spaces. 


### Process

This project was driven entirely by technical exploration. It started as a quick prototype that turned my personal studio space into a multi-cam livestream space. I used three cameras, each of which highlighted a different window into the set. 

![Small cubicle with a laptop pointed towards one corner, and areas denoted with blue tape](./live-edit-06.png '#grid-column=left / center')

![Multiple webcams pointed into a small cubicle, with a green screen hanging on one end](./live-edit-07.png '#grid-column=center / right')

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/85i9X8Rdeuw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Then I started to explore using spatial triggers, using a HTC Vive controller, rather than just digital ones to trigger the camera angle choice. 

![Open space within an office, with the floors taped, and webcams scattered on tripods](./live-edit-09.png '#grid-column=wide-left / center')

![Wooden frame built around a desk](./live-edit-08.png '#grid-column=center / wide-right')

I then worked to integrate a full system together, that would work cohesively, across multiple devices, and at the same time refine the visual language of the piece. 

Some of the key technical and design challenges were:
* Mapping the spatial zones in Unity to specific camera angles
* Using OBS to incorporate a digital feed from a different computer
* Wiring!
* Refining the visual language of the piece

![Someone sitting in front of a wooden frame, computer, and tangle of wires.](./live-edit-10.png '#grid-column=wide-left / center')

![Four volumes highlighted within a Unity scene.](./live-edit-11.png '#grid-column=center / wide-right')







