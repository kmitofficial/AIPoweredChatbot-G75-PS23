import g4f 
from rasa_sdk import Action, Tracker
from typing import Any, Text, Dict, List
from rasa_sdk.executor import CollectingDispatcher
from g4f.Provider import Liaobots
import random
import requests
import sqlite3
import asyncio
class GPT3ChatCompletionAction(Action):

    def name(self):
        return "action_gpt2_eng"

    async def run_provider(self, provider: g4f.Provider.BaseProvider, dispatcher: CollectingDispatcher, tracker: Tracker, chacha_lines_eng: List[str], chacha_prefix_eng: List[str]):
        user_message = tracker.latest_message.get('text')
        try:
            response = await g4f.ChatCompletion.create_async(
                model=g4f.models.default,
                messages=[{"role": "user", "content": "This is about Namami Gange. Answer directly to the question creatively in 1 sentence, make it VERY educative: " + user_message}],
                provider=provider,
            )
            response = str(response)
            selected_line_eng = random.choice(chacha_lines_eng)
            prefix_eng = random.choice(chacha_prefix_eng)
            response = prefix_eng + " " + response + " " + selected_line_eng
            dispatcher.utter_message(text=str(response))
            dispatcher.utter_message(text="Please type 'cont' to continue after attempting quiz.")
        except Exception as e:
            dispatcher.utter_message(text=f"Failed to fetch response from {provider.__name__}: {e}")

    async def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        print("Got into action_gpt2_eng")
        user_message = tracker.latest_message.get('text')
        language = tracker.get_slot("language")
        language = language.lower()

        if user_message.lower() == 'no':
            print("User said no, moving on...")
            dispatcher.utter_message(text="Please type 'cont' to continue.")
            return []

        _providers = [
            g4f.Provider.Liaobots,
        ]
        chacha_lines_eng = [
            "Chacha Chaudhary's brain works faster than a computer!",
            "Chacha Chaudhary makes every difficulty seem easy!",
            "The secret to accomplishing anything big in the world is teamwork!",
            "Chacha Chaudhary always thinks one step ahead!",
            "When Chacha Chaudhary speaks, everyone understands!",
            "Remember it well, Chacha Chaudhary always makes the right decisions!",
            "Any problem can be solved if there is determination within oneself!",
            "The game of strategy runs in Chacha Chaudhary's mind!",
            "Courage is not giving up in the face of any difficulty!",
            "Faster than the mind, faster than the heart. Chacha Chaudhary, everyone's big man!",
            "Every difficulty has a solution, a little patience is all that's needed!",
            "Chacha Chaudhary never accepts defeat!",
            "Whenever there's a problem, Chacha Chaudhary brings the solution!",
    ]
        chacha_prefix_eng = [
            "Well, well, well, ",
            "Oh, my dear friend, ",
            "Well, my friend, ",
            "Oh, my friend, ",
            "Oh, my dear, ",
            "Well, well, ",
            "Well, little ones, ",
            "Well, my dear children, ",
            "Oh, my curious little one, ",
            "Well, my curious little one, ",
            "Well, my curious friend, ",
            "Oh, my curious friend, ",

        ]

        await asyncio.gather(*[self.run_provider(provider, dispatcher, tracker, chacha_lines_eng, chacha_prefix_eng) for provider in _providers])

        return []

class GPT3ChatCompletionActionHindi(Action):

    def name(self):
        return "action_gpt2_hi"

    async def run_provider(self, provider: g4f.Provider.BaseProvider, dispatcher: CollectingDispatcher, tracker: Tracker, chacha_lines_hi: List[str], chacha_prefix_hi: List[str]):
        user_message = tracker.latest_message.get('text')
        try:
            response = await g4f.ChatCompletion.create_async(
                model=g4f.models.default,
                messages=[{"role": "user", "content": "This is about Namami Gange. Answer directly to the question creatively in 1 sentence in HINDI, make it VERY educative: " + user_message}],
                provider=provider,
            )
            response = str(response)
            selected_line_eng = random.choice(chacha_lines_hi)
            prefix_eng = random.choice(chacha_prefix_hi)
            response = prefix_eng + " " + response + " " + selected_line_eng
            dispatcher.utter_message(text=str(response))
            dispatcher.utter_message(text="प्रश्नोत्तरी का प्रयास करने के बाद जारी रखने के लिए कृपया 'जारी रखें' टाइप करें।")
        except Exception as e:
            dispatcher.utter_message(text=f"Failed to fetch response from {provider.__name__}: {e}")

    async def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        print("Got into action_gpt2_hi")
        user_message = tracker.latest_message.get('text')
        language = tracker.get_slot("language")
        language = language.lower()
        if user_message == 'नहीं':
            print("User said no, moving on...")
            dispatcher.utter_message("जारी रखने के लिए कृपया 'जारी रखें' टाइप करें।")
            return []

        _providers = [
            g4f.Provider.Liaobots,
        ]
    
        chacha_lines_hi = [
            "चाचा चौधरी का दिमाग कंप्यूटर से भी तेज चलता है।",
            "चाचा चौधरी हर मुश्किल को आसान कर देते हैं।",
            "दुनिया के हर बड़े काम को करने का राज है, टीमवर्क।",
            "चाचा चौधरी हमेशा एक कदम आगे सोचते हैं।",
            "जब चाचा चौधरी बोलते हैं, तो समझ जाते हैं सब।",
            "बिल्कुल याद रखिएगा, चाचा चौधरी हमेशा सही फैसले करते हैं।",
            "किसी भी समस्या का समाधान होता है, अगर इंसान में इरादा हो।",
            "चाचा चौधरी के दिमाग में चलता है स्ट्रेटेजी का खेल।",
            "हिम्मत वह होती है जो किसी मुश्किल को हार ना माने।",
            "दिमाग से तेज है, दिल से भी तेज है। चाचा चौधरी, सबका बड़ा आदमी।",
            "हर मुश्किल का हल होता है, बस थोड़ा पेशेंस चाहिए।",
            "चाचा चौधरी, कभी भी हार नहीं मानते।",
            "जब भी कोई समस्या आती है, चाचा चौधरी उसका समाधान ले कर आते हैं।"

        ]
        chacha_prefix_hi = [
            "ओह, मेरे प्यारे दोस्त, ",
            "अच्छा, मेरे दोस्त, ",
            "ओह, मेरे दोस्त, ",
            "ओह, मेरे प्यारे, ",
            "बच्चों, ",
            "अच्छा, मेरे प्यारे बच्चों, ",

        ]

        await asyncio.gather(*[self.run_provider(provider, dispatcher, tracker, chacha_lines_hi, chacha_prefix_hi) for provider in _providers])

        return []

class ActionWeatherEnglish(Action):
    def name(self) -> Text:
        return "action_weather_eng"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        print("Got into action_weather_eng")
        language = tracker.get_slot("language")
        language = language.lower()
        api_key = '357eb6ab3216918390b603bc4936188d' #put YOUR API KEY here
        user_city = 'new delhi'
        base_url = f'http://api.openweathermap.org/data/2.5/weather?q={user_city}&appid={api_key}'
        response = requests.get(base_url)
        data = response.json()
        if response.status_code == 200:
            weather_desc = data['weather'][0]['description']
            temperature = round(data['main']['temp'] - 273.15, 2) 
            message = f"The weather in {user_city} is {weather_desc}. The temperature is {temperature}°C."
            air_quality_url = f'http://api.openweathermap.org/data/2.5/air_pollution?lat={data["coord"]["lat"]}&lon={data["coord"]["lon"]}&appid={api_key}'
            air_quality_response = requests.get(air_quality_url)
            if air_quality_response.status_code == 200:
                air_quality_data = air_quality_response.json()
                air_quality_index = air_quality_data['list'][0]['main']['aqi']
            else:
                print("Sorry, I couldn't retrieve the air quality information at the moment.")
        else:
            print("Sorry, I couldn't retrieve the weather information at the moment.")
        
        aqi_eng = {
            1: f"Air quality in {user_city} is as crisp as the punch of Sabu! Crystal clear and refreshing!",
            2: f"The air in {user_city} is as clear as my wisdom, with a touch of playful clouds.",
            3: f"Just like solving a tricky puzzle, the air in {user_city} has a bit of complexity, but nothing we can't handle!",
            4: f"The air in {user_city} has a bit of a murkiness, like a mysterious fog that needs a bit of clearing.",
            5: f"As chaotic as a villain's plan, the air quality in {user_city} is in dire need of our superhero intervention!"
        }

        if 10 <= temperature < 15:
            temp_eng = f"The temperature of {temperature} is as cool as a cucumber, just perfect for a delightful day!"
        elif 15 <= temperature < 20:
            temp_eng = f"The weather is like a pleasant breeze with a temperature of {temperature}, making the day quite enjoyable!"
        elif 20 <= temperature < 25:
            temp_eng = f"As comforting as a warm hug, the temperature of {temperature} feels just right!"
        elif 25 <= temperature < 30:
            temp_eng = f"The weather has a bit of a sunlit warmth with a temperature of {temperature}, enough to keep spirits high!"
        elif temperature >= 30:
            temp_eng = f"The temperature of {temperature} is as hot as a spicy adventure, requiring some cooling measures!"
        
        print("Language:", language)
    
        if language=='english':
            dispatcher.utter_message(text=aqi_eng[air_quality_index] + " And " + temp_eng.lower())
            dispatcher.utter_message(response='utter_intro')

        return []

class ActionWeatherHindi(Action):
    def name(self) -> Text:
        return "action_weather_hi"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        print("Got into action_weather_hi")
        language = tracker.get_slot("language")
        language = language.lower()
        api_key = '357eb6ab3216918390b603bc4936188d' #put YOUR API KEY here
        user_city = 'new delhi'
        base_url = f'http://api.openweathermap.org/data/2.5/weather?q={user_city}&appid={api_key}'
        response = requests.get(base_url)
        data = response.json()
        if response.status_code == 200:
            weather_desc = data['weather'][0]['description']
            temperature = round(data['main']['temp'] - 273.15, 2) 
            message = f"The weather in {user_city} is {weather_desc}. The temperature is {temperature}°C."
            air_quality_url = f'http://api.openweathermap.org/data/2.5/air_pollution?lat={data["coord"]["lat"]}&lon={data["coord"]["lon"]}&appid={api_key}'
            air_quality_response = requests.get(air_quality_url)
            if air_quality_response.status_code == 200:
                air_quality_data = air_quality_response.json()
                air_quality_index = air_quality_data['list'][0]['main']['aqi']
            else:
                print("Sorry, I couldn't retrieve the air quality information at the moment.")
        else:
            print("Sorry, I couldn't retrieve the weather information at the moment.")
        
        aqi_hi = {
            1: f"दिल्ली में वायु गुणवत्ता सबू के पंच की तरह ताजा है! क्रिस्टल क्लियर और ताज़ा!",
            2: f"दिल्ली में वायु उत्तम है, जैसे मेरी समझ का ताज़ा झोंका, जिसमें खेलने वाले बादलों का एक स्पर्श है।",
            3: f"एक चुनौतीपूर्ण पहेली को हल करने की तरह, दिल्ली में वायु में थोड़ी जटिलता है, लेकिन हम इससे निपट सकते हैं!",
            4: f"दिल्ली में वायु में थोड़ा धुंधलापन है, जैसे एक रहस्यमय कोहरा जो साफ़ करने की जरूरत है।",
            5: f"एक खलनायक की योजना की तरह अशांत, दिल्ली में वायु गुणवत्ता हमारे सुपरहीरो दल की जरूरत है!"
        }
        
        if 10 <= temperature < 15:
            temp_hi = f"{temperature} का तापमान एक खीरे की तरह ठंडा है, एक आनंदमय दिन के लिए बस सही!"
        elif 15 <= temperature < 20:
            temp_hi = f"दिन बहुत ही आनंददायक है, {temperature} के तापमान के साथ एक सुहावनी हवा की तरह!"
        elif 20 <= temperature < 25:
            temp_hi = f"एक गर्म गले की तरह आरामदायक, {temperature} का तापमान बस सही लगता है!"
        elif 25 <= temperature < 30:
            temp_hi = f"दिन की ऊंध में थोड़ा गर्मी है, {temperature} के तापमान के साथ एक धूप से भरा तापमान, जो उच्च आत्मा को बनाए रखने के लिए पर्याप्त है!"
        elif temperature >= 30:
            temp_hi = f"{temperature} का तापमान एक मसालेदार साहसिक जीवन की तरह गर्म है, जिसके लिए कुछ ठंडे उपाय की जरूरत है!"


        print("Language:", language)
        if language=='hindi':
            dispatcher.utter_message(text=aqi_hi[air_quality_index] + " " + temp_hi.lower())
            dispatcher.utter_message(response='utter_intro_hi')
    
        return []
class FEEDBACK1(Action):
    def name(self):
        return "action_feedback1"
    
    def run(self, dispatcher, tracker, domain):
        print("Got into action_feedback1")
        emo = tracker.get_slot("rating")
        suggestion = tracker.latest_message.get('text')
        print(f"emo: {emo}, type: {type(emo)}")
        print(f"suggestion: {suggestion}, type: {type(suggestion)}")
        with sqlite3.connect('rasa_feedback2.db') as conn:
            cursor = conn.cursor()
            cursor.execute('INSERT INTO feedback2 (rating, suggestion) VALUES (?, ?)', (emo, suggestion))
            conn.commit()
            cursor.execute('SELECT * FROM feedback2')
            rows = cursor.fetchall()
            for row in rows:
                print(row)
        language = tracker.get_slot("language")
        language = language.lower()
        print("Language: ", language)
        if language=='english':
            th = "Thank you for your rating and suggestions!"
            dispatcher.utter_message(text=th)
        elif language=='hindi':
            th = "अपनी रेटिंग और सुझाव के लिए धन्यवाद!"
            dispatcher.utter_message(text=th)

        return []
    

