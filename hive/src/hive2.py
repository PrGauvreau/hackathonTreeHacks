from textblob import TextBlob
from interactive_conditional_samples import interact_model
from generate_unconditional_samples import sample_model
from profanity_check import predict, predict_prob

'''
Categories
* fact:
    * category: 'fact'
    * text format: a topic, related facts
* verify:
    * category: 'verify'
    * text format: an statement (eg, )
    * description:
* opinion
    * category: 'opinion'
    * text format: a topic (eg, climate change, immigration) or a question (eg is cybersecurity good?)
    * description: ask for public opinion in a topic
* topic:
    * category: 'topics'
    * text format: an array with topics (eg, ['real estate', 'houses', 'mortgage'])
    * description: it will return similar topics.
'''

def get_full_sentences(text):
    words = text.split()
    pos, i = -1, len(words) - 1

    while pos == -1 and i >= 0:
        if '.' in words[i]:
            pos = i
        i -= 1

    text = ' '.join(words[:pos + 1])
    return text

def model_wrapper(category, text):
    print(text)
    original_text = text
    if category == 'fact':
        # text = 'On climate change, scientists showed that '
        # text = 'On climate change, it is a fact that '
        # text = 'Table. Figure. Truth. It is a scientific fact that '
        text = f'http://wikipedia.com. On {text}, it is a scientific fact that '
        length = 50
    elif category == 'verify':
        text = f'Is it true and real that {text}? My answer is '
        length = 10
    elif category == 'sentiment':
        text = f'JANE: What are your feelings about {text}? JIM: My sentiment on {text} is that '
        length = 400
    elif category == 'opinion':
        text = f'JANE: What are your beliefs about {text}? JIM: My opinion on {text} is that '
        length = 120
    elif category == 'topic':
        # text = f'Tell me a topic related to {text[0]}. What is a similar subject to {text[1]}?'
        text = f'{text}, '
        length = 20

    text = interact_model(text, nsamples=1, batch_size=1, length=length, top_k=100)#, temperature=.1)

    if category == 'fact':
        text = get_full_sentences(text)
        if len(text) == 0:
            text = model_wrapper(category, original_text)
        else:
            if text[0] != ' ': text = f' {text}'
            text = f'On {original_text}, it is a fact that' + text
    elif category == 'verify':
        pass
    elif category == 'sentiment':
        sentiment = TextBlob(text).sentiment.polarity
        if sentiment < -.15: feeling = 'negative'
        elif sentiment < .15: feeling = 'neutral'
        else: feeling = 'positive'
        sentiment = int(sentiment * 1000) / 1000
        text = f'The sentiment is {feeling} ({sentiment})'
    elif category == 'opinion':
        text = get_full_sentences(text)
        text = f'My opinion on {original_text} is that {text}'
    elif category == 'topic':
        text = text.replace(', and', ', ')
        text = text.replace(' and ', ', ')
        text = text.replace('.', ',')
        topics = text.split(', ')
        topics = topics[:-1]
        if len(topics) == 0:
            text = model_wrapper(category, original_text)
        else:
            text = ', '.join(topics)
        text = text.replace('\xa0', '')
        text = text.replace('etc', '')
        text = text.replace('.', '')
        text = text.replace('\'', '')
        text = text.replace('"', '')
        text = text.replace('\n', ' ')

    # is it offensive content?
    # print(text)
    if predict([text]):
        text = model_wrapper(category, original_text)


    if '___' in text or '---' in text or '....' in text:
        text = model_wrapper(category, original_text)

    return text
'''

# interact_model('apa la papa', nsamples=100, batch_size=1, length=128, top_k=100)
for _ in range(3):
    # print(model_wrapper('topic', ['mortgage', 'landed property', 'immoveables', 'real estate']))
    # print(model_wrapper('opinion', 'climate change'))
    # print(model_wrapper('verify', 'what'))
    print(model_wrapper('fact', 'climate change'))
    print('\n' * 10)

'''
