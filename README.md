# CT Backend Engineer Exercise

First let me say... this was a lot of fun! I don't get the opportunity in my current position to develop/design applications of this scope often, so I thoroughly enjoyed this experience! Even with the some of the difficulties I ran into, I would choose doing this over implementing some third-party vender's script on the frontend any time! With that said, let's get into it!

Usage
----
To run this application, you must be in the root level of the repo. There are two different commands you can run: one to look up shops and their corresponding info, and another to sync and update a shop's listing file.
* To look up shops, execute `npm run shops:lookup`
* To sync and update a shop's listing execute `npm run shop:sync <shop_id>`, where `shop_id` is a valid shop id you provide.

What I Didn't Finish/Get To
----
I didn't get to unit test any of this unfortunately (I _really_ wanted to). I am used to unit testing so much so that, although I'm not a test-driven developer necessarily, I do think about how can I test certain blocks of code as I'm writing them. The way it's currently written would not facilitate very good unit tests anyway, so the modules would need to be broken down further.

I also haven't functionally tested the bit of logic regarding if the data from the current run and the data from the previous run are different. The idea was to compare the two `listings` arrays and see if each listing object had the same `listing_id`. If they did, then the next step was to see if the `state_tsz` (last time the state of the listing was modified) and the `state` attributes were the same. I took this approach because I realized there are more states than just 'removed' and 'added'.

Comments and comment blocks... yeah I needed to probably add a lot more.

More error handling... you can never have enough error handling...

What Was Cool
----
So I had written a node application in the past that required data to be structured in a specific way, so I learned to use a template file when possible. It encourages scaling, and is relatively simple to maintain.

What Wasn't So Cool
----
My biggest hurdle was really understanding all of Etsy's data points and how they intersected with each other. It took me awhile to really piece together `shops`, `listings`, and `states` mainly because I don't regularly work with e-commerce APIs. I assume (but I could be wrong) the more I work within this industry and its resources, the easier it will be to decipher each client's (?_vender's_?) specific API structure and data. I feel this is what added the most to my time.

Another hurdle from a coding perspective was the array comparison I mentioned above. I felt like I got a little too ambitious with trying to utilize the `state_tsz` and 'coded myself into a corner' so to speak. I believe my approach would need some extra structuring within the template to make it easier to correspond each object with its `listing_id` and utilize that unique identifier to establish differences between the two runs.

Next Features
----
My thoughts on extending this into a full fledged microservice are as follows:
* I realized pretty quickly how massive the data payloads are when making requests, so building and utilizing a GraphQL server so that requests are only getting back the data that's needed would make it more efficient.
* Storage would depend on how this data would be used in combination with other data, but the simplest way would be to store each JSON string object in its own cell. For example, if using a relational database, each table could group shops based on some sorting method (region maybe?), each column to a shop, and each row would then be a timestamped sync run.
* Deployment and application triggering would also be heavily dependent on how it's being used. I haven't deployed a Node app on my own but I would look into something like a [Express + Webpack setup](https://medium.com/@binyamin/creating-a-node-express-webpack-app-with-dev-and-prod-builds-a4962ce51334).
* Because developers usually develop stuff for non-developers, a UI would be pretty cool. Vue.js or React.js would work. For some visualization D3.js is something I've wanted to play with.

Well, hope this wasn't an exhausting read. I just wanted to make sure I was thorough! Hope to hear from you soon!
