import {useProgress} from './Components/ProgressBar/useProgress.ts'
const useRequest = (props : any, config: any) => {
    return fetch(props, config)
};

export {
    useProgress,
    useRequest
}