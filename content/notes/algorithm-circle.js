import React from "react"
import Img from "gatsby-image"
import SEO from "../../src/components/SEO"
import { graphql } from 'gatsby'
import Article from "../../src/components/article"

export default function AlgorithmCircle({data}) {
  console.log(data);
  return (
    <Article>
      <SEO title="Algorithm Circle" description="A personal reflection on reccomendation algorithms and social experiences of finding new things to watch, read, listen or consume." />
      <h1>What should I read/watch/listen?</h1>
      <p style={{fontFamily: 'DM Sans', fontSize: '1.4rem', lineHeight: "1.3", marginBottom:"40px"}}>A personal, <b>"neostalgic"</b> look at content reccomendation to imagine collective approaches to reccomendation algorithms </p>
      {/* <hr /> */}
      <p><i>I remember going to the library as a kid looking for a specific book and finding that someone else in my community had already checked it out. Instead of giving up, I would inevitably find something else interesting to read while browsing the spines of the books that were nearby alphabetically.</i></p>
      <p><i>I remember how listening to my roommates play music on speakers in college shifted my taste in music. And I remember how the music I played on the speakers changed my friends' tastes in music. My playlists from that time are now a time capsule of those changing tastes.</i></p>
      <hr />
      <p>Nowadays, I find that the things we read/watch/listen/consume are mediated largely through reccomendation algorithms. <b>This isn't a nostalgic plea to return to a time before algorithmically curated content</b> - reccomendation algorithms have exposed me to things that I may never have found on my own. The conventional story we're given for these algorithms is that they are trained on our personal, individual data history, often across our digitial and physical lives, all to convieniently deliver the ideal list of content to consume.</p> 
      <p>When you compare this story to the ones I recounted at the top of this essay, it's oddly focused on the individual. My past experiences with reccomendations have all been collective experiences: in the case of the public libtary, it was through a bookshelf which was curated by my librarians, and whose catalog was impacted by what people in my local community were checking out. And more obviously, with music listening in college, it was through the collective listening and sharing in our semi-public spaces.</p>
      <p>Even today, <b>there are clear tensions at the edge of the individualistic narrative put forth by reccomendation algorithms:</b> when you are using a friend of a friend's netflix password, those netflix reccomendations reflect your collective watch history; or when you use your spotify account to play music at a party, and then your algorithmically generated playlists start to reflect the tastes of the people at the party who grabbed your phone and chose new songs. But, by and large, the only levers we have to intervene in the algorithm is to shift our behaviors: changing how we interact with the system, changing what we choose to consume, and changing how we fit those systems into our daily lives.</p>
      <p>The algorithm itself is a "secret sauce" that no company wants to expose to their users. Instead, people develop their own <a href="https://journals.sagepub.com/doi/full/10.1177/2053951720923377">algorithmic folk theories</a> to speculate and rationalize how theyse algorithms work. These folk understandings of opaque reccomendation algorithms inform the ways in which we change our behaviors. You might put on "private mode" on Spotify in the hopes that the algorithmic recommendation system doesn't take into account the song you've just listened to when generating next week's "Discover Weekly." You can only speculate that spotify ignores the data collected while in private mode.</p>
      <p>These reflection on the current experience around reccomendation algorithms suggests the following speculations:</p>
      <h2>What would it look like if reccomendation algorithms were collective artifacts, shared amongst communities?</h2>
      <h2 style={{paddingTop:"0"}}>And what would it look like if we had agency over the design of those shared algorithms instead of just the data we give those algorithms?</h2>
      <h3>Sketching</h3>
      <p>Exploring those questions could take many forms: from practical experiments that could happen now, to speculations of the future that imagine whole systems. </p>
      <p>This first sketch, below, gives a glimpse into a system where you could be invited into a collaborative algorithm which would function much like a group chat does today.</p>
      <Img fluid={data.mainImage.childImageSharp.fluid} />
      <p>Cards reminiscent of library cards would be physical artifacts that give you access to individual algorithms that you build collaboratively with friends and family. Cards for old algorithms that took a turn for the worse remain in your junk drawer as an archive of algorithms that are no longer in use. You might have a variety of cards, shared amongst different groups of people, that have been carefully co-curated with specific data you've chosen to provide.</p>
      <p style={{paddingTop:"40px"}}><i>This essay marks the beginning of my work with these ideas/concepts. Get in touch if you have any ideas or would like to collaborate.</i> </p>
      
    </Article>
  )
}

export const query = graphql`
  query {
    mainImage: file(base: {eq: "algorithm-circle.png"}) {
      childImageSharp {
        fluid(maxWidth:1920) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`


