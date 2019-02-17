Hey!

how to run it?
1) git clone this repo
2) run the command "sh download_model.sh 117M" you will need gsutil
3) "pip3 install -r requirements.txt" or "pip install -r requirements.txt" depending on your pip
4) everything is installed now, you can run the program by running "python src/hive.py"

(if those steps don't work, what you can do is to follow the instructiopns from the openai model https://github.com/openai/gpt-2 and then add the changes I made to the openai repo. There are only two files we care about: src/hive.py and  src/interactive_conditional_samples.py so you can add hive.py and modify interactive_conditional_samples in the openai repo)

The model is working. I think that the best way to take advantage of this model is to use an application related to public opinion. I think that because the model was trained on text written in the internet, that is, things written by random people. The things that this model is going to say are the things that most people are saying. Thus, it's a representative model. It's also good because you can induce the model to talk about any given topic, and to produce the next sentences it's taking into account lots of opinions, not only one opinion from one cite. Say you are a government and you want to know what the public thinks about one policy? Instead of doing a poll you just simulate it. Another very interesting thing is that we can generate a debate between people and simulate how a conversation of several people would develop.


potential next thigns to do
* A next step could be to prune the generated text from the bots instead of completely feeding it into the model.
* integrate it with the program paul started to write
* add more intervention with humans (now humans are only giving input in the beginning.)
* We can experiment with
    * what we add in the header variable (check hive.py)
    * how we structure content + header. (more on this in line 33 in file hive.py)
    * I think we can see the content as the document/memory written by the model. So I think that it would be useful to see how we can build a document that is representative of what the bots are saying.
    * Trying changing the values for the temperature parameter.



Below it's an example of the text generated.

RODNEY: Hmm? RODNEY: Okay I'm a lot better at understanding human influence on climate. A lot better at understanding human influence on climate. RODNEY: For example. The oceans are warming because we're pulling them up. The atmosphere is warming because we're getting rid of carbon dioxide to help cool them. Are we doing the right thing or the right thing wrong? It does change a lot about the human system and about our environment. Do you have any views about this? OK.
It is a great sign that things are not normal, that we're growing more heat, that there's a problem with sea level, that there's a good deal of algae in the oceans... That everybody's thinking their way, that we're living in a really dangerous place, that we're in overpopulation, that there is an earthquake that's happening all at once. And some scientists are warning that then you're about to get a lot more extreme. As you can imagine in the United States, global temperatures are going toward freezing.
JANE: Well, I hope you become better, and if you become better, just be aware that there will be consequences. And please don't get into any of these different opinions because they're going to hurt the president. RODNEY: President Obama said he was prepared to step down now. It's possible we might be in for some bad years. But at present the president is trying to get rid of certain regulations that do affect your ability to pay. RODNEY: There's come a point where science is very, very hard to get right. We have a shortage of highly qualified scientists in laboratories.
Well, it would seem that, if we have a warming planet -- if we have a cooling planet, then if we use man-made greenhouse gases to cool down the planet, then we are warming the planet. But what we have here -- JANE: Thank you. Thank you. RODNEY: But you never seem to give answers to real scientific issues. JANE: My biggest problem is that many of your points are ridiculous. Yes, I mentioned the ice and you mentioned the sea level. I think you've really just been wasting your time in trying to distract people from the real science.
If you look at your world, do you get confused on whether climate is simply or not - a temperature increase is just a bad thing. Most scientific experts agree that man-made global warming is the cause of the problem. But the truth lies in the extreme effects we're seeing everywhere. Perhaps now we can help look at the planet's influence on Earth.<|endoftext|>BONFORD, Conn. (AP) — A Stamford man accused of robbing two banks and murdering a woman as she fled the scene of a rape is on trial Monday. District Judge Paul LaFountain announced no charges.
JANE: I think we're not completely left with the science. We don't have to believe what people are saying. I just think it's bad that we don't provide the science. It's better to wait for the data to come out. JANE: Well, as with all things and science, get a grasp on what's going on. Just don't overreact to the scientific evidence. We're going to stop telling people what's coming out of that room. RODNEY: Well, the fact that you've been accused of raping the woman is very disturbing.
RODNEY: Well, if you go back, all of my high school years I said that I was a fan of man-made climate change. I was a conservative. And the idea that I'll use that argument in the White House, that I would attack my religious affiliation, that I'm wrong on that, is so harmful. And so the idea of trying to influence policy on those beliefs, I think that's wrong. It's very, very disheartening. And you should be sure you're doing everything you can to hold people accountable for what they say.
