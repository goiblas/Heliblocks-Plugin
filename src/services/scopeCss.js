import scopeCss from 'scope-css';

export default function (css, scope) {
    if(!scope) return css
    const className = '.' + scope;
    
    return  scopeCss(css, className, scope + '-')
                    .replace(/body|html/g, '')
                    .replace(/:root/g, className);
}