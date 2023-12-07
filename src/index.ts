import {useProgress} from './Components/ProgressBar/useProgress.ts'
import useDialog from './useDialog/index.ts'

const useRequest = (props : any, config: any) => {
    return fetch(props, config)
};

export {
    useProgress,
    useRequest,
    useDialog
}