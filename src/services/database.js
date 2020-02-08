import apiFetch from '@wordpress/api-fetch';

const PATH_TOKENS = '/heliblocks/v1/tokens';
const PATH_STYLESHEET = '/heliblocks/v1/stylesheet';

export async function getTokens(){
    const response = await apiFetch({
            path: PATH_TOKENS
        });
    return JSON.parse(response);
}
export function saveTokens(tokens){
    return apiFetch({
        path: PATH_TOKENS,
        method: "POST",
        body: JSON.stringify(tokens)
      });
}

export function getStylesheet(){
    return apiFetch({
        path: PATH_STYLESHEET
      });
}

export function saveStylesheet(stylesheet){
    return apiFetch({
        path: PATH_STYLESHEET,
        method: "POST",
        body: stylesheet
      });
}