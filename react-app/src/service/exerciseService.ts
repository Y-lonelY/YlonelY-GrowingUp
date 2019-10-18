import { post } from '../cluster/Request';
import { exerciseList, addList, goalList } from './mock/exerciseMock';
import { config } from '@/config/sysConfig';

const useMock = config.useMock === 'false' ? false : true;

async function getDailyExerciseList(params={}) {
    try {
        const request = useMock ? await exerciseList : await post("exercise/list", params);
        return request;
    } catch (e) {
        console.log(e);
    }
}

async function addExerciseList(params: {date: string, leg: number, belly: number, chest: number}) {
    try {
        const request = useMock ? await addList : await post("exercise/add", params);
        return request;
    } catch (e) {
        console.log(e);
    }
}

const getGoalList = async () => {
    try {
        const request = useMock ? await goalList : await post("exercise/goal/list");
        return request;
    } catch (e) {
        throw(e);
    }
}

export { getDailyExerciseList, addExerciseList, getGoalList }