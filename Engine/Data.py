import asyncio
from datetime import datetime
from Database import Database
from Logger import log


def valid(s):
    if s is None:
        return False
    if type(s) is str and s == "":
        return False
    if type(s) is int and s < 0:
        return False
    return True


def init():
    # noinspection PyGlobalUndefined
    global answers
    # noinspection PyGlobalUndefined
    global tests
    answers = {}
    tests = {}


def add_questionnaire(results, participant):
    if not valid(participant):
        return
    log(datetime.now().strftime("%H:%M:%S") + " adding questionnaire of participant with id " + str(participant))
    message = 'participant ' + str(participant) + ' answers: '
    i = 1
    if not valid(results['questionnaire_number']):
        return
    for result in results['answers']:
        if not valid(result['question']['text']) or not valid(str(result['answer'])):
            return
        message += '\n\t' + result['question']['text'] + ": " + str(result['answer'])
        Database.addAnswer(results['questionnaire_number'], i, participant, datetime.now(), str(result['answer']))
        i = i + 1
    log(datetime.now().strftime("%H:%M:%S") + " " + message)
    event = answers[participant][results['questionnaire_number']]
    event.set()


def add_form(number, participant):
    if participant in answers:
        answers[participant][number] = asyncio.Event()
    else:
        ans = {number: asyncio.Event()}
        answers[participant] = ans


def add_test(name, results, participant):
    if not valid(name) or not valid(participant) or not valid(results['test']) or results['result'] is None:
        return
    log(datetime.now().strftime("%H:%M:%S") + ' participant ' + str(participant) + ' results of test ' + results['test']
        + ': ' + str(results['result']))
    Database.addTestResults(name, participant, datetime.now(), results['result'])
    for test in reversed(tests[participant]):
        if test[0] == name:
            event = test[1]
            event.set()


def add_test_form(name, participant):
    if participant in tests:
        tests[participant].append((name, asyncio.Event()))
    else:
        ans = list()
        ans.append((name, asyncio.Event()))
        tests[participant] = ans


async def get_test_result(participant_id, test_name):
    log(datetime.now().strftime("%H:%M:%S") + " getting results of test " + test_name + " of participant " +
        str(participant_id))
    for test in reversed(tests[participant_id]):
        if test[0] == test_name:
            await test[1].wait()
    return Database.getTestResult(participant_id, test_name)


async def parse_questionnaire_condition(patient, questionnaire_number, question_number, accepted_answers):
    return await check_data(patient, questionnaire_number, question_number, accepted_answers)


def parse_trait_condition(participant_id, satisfy, trait):
    participant = Database.getUser(participant_id)
    if satisfy['type'] == 'range':
        values = satisfy['value']
        return True if values['min'] <= participant.get_traits()[trait] <= values['max'] else False
    else:
        return True if participant.get_traits()['gender'] == satisfy['value'] else False


async def parse_test_condition(patient, satisfy, test_name):
    if satisfy['type'] == 'range':
        values = satisfy['value']
        return True if values['min'] <= int(await get_test_result(patient, test_name)) <= values['max'] else False
    else:
        return True if await get_test_result(patient, test_name) == satisfy['value'] else False


async def check_data(participant, questionnaire_number, question_number, accepted_answers):
    if questionnaire_number in answers[participant]:
        await answers[participant][questionnaire_number].wait()
    ans = Database.getAnswer(questionnaire_number, question_number, participant)
    return ans == accepted_answers
