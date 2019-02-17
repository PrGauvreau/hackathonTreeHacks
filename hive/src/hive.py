from src.interactive_conditional_samples import interact_model
from src.generate_unconditional_samples import sample_model

# The line below generates text without input
# text = sample_model(nsamples=1, batch_size=1, length=32, top_k=100)

# I started with JOSH: JANE: and RODNEY: because that induces the format of a conversation in the generated text. And that's great if we do the public opinion thing, because it represents a dialogue between people and not factual things.
# header = 'JOSH: What do you think about climate change?\nJANE: Tell me your beliefs on global warming.\nRODNEY: What is your opinion on the rise in the average temperature?'
header = 'Give me topics like Global warming, weather, climate change, temperature rise, sea levels'
content = '' # This variable will store all the accumulated conversation of the bots.

while True:
    # text = f'{content}\n{header}'
    text = header
    # The length here is the length of the generated text. I'm not sure about top_k, but I think that the greater top_k it is, the more diversity the generated text has. nsamples and batch_size is fine to keep them in 1, it's about how many samples we generate, and we just want one.
    new_content = interact_model(text, nsamples=1, batch_size=1, length=128, top_k=100)

    # Lines 16 - 25 are just to take a sentence like this "JANE: he was a good person. I would" and convert it to "JANE: he was a good person." We are just truncating the sentence to avoid incomplete sentences.
    words = new_content.split()
    pos, i = -1, len(words) - 1

    while pos == -1 and i >= 0:
        if '.' in words[i]:
            pos = i
        i -= 1

    new_content = ' '.join(words[:pos + 1])
    print(new_content)
    content = f'{content}\n{new_content}'
    print(text + '\n\n\n\n\n\n\n\n\n')


'''
How to use this?
It works like this. At each iteration we feed one chunk of text to the model and based on that the model generates a new piece of text. The input for the model is content + header. So it first receives the whole conversation and then it receives the header which is the initial questions. I did it this way and not header + content because otherwise they diverge from the topic too much. It would also be interesting to test how they diverge and start to talk about random topics.

'''
