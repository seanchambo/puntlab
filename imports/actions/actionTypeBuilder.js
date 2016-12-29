// This function will be extracted to an npm package later
export function actionTypeBuilder(prefix) {
    return {
        type: actionType => `${prefix}/${actionType}`,
        ready: actionType => `${actionType}/ready`,
        changed: actionType => `${actionType}/changed`,
        error: actionType => `${actionType}/error`,
        success: actionType => `${actionType}/success`,
    };
}

export default actionTypeBuilder('@puntlab');