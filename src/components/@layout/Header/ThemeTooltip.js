import React from 'react';
import { styled } from '../../../styles/stitches';
const STORAGE_KEY_THEME = 'maxkim-blog-theme';
const themes = ['light', 'dark', 'mincho', 'lemon'];
function ThemeTooltip() {
    const setBlogTheme = (theme) => {
        localStorage.setItem(STORAGE_KEY_THEME, theme);
        if (typeof window !== 'undefined') {
            //TODO window 타이핑하기
            window.__setTheme(theme);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(ThemeWrapper, null, themes.map((theme) => {
            return (React.createElement(ThemeText, { key: theme, onClick: () => {
                    setBlogTheme(theme);
                } }, theme));
        }))));
}
const ThemeWrapper = styled('div', {
    display: 'flex',
});
const ThemeText = styled('div', {
    fontSize: '$body4',
    marginRight: '8px',
    '&:hover': {
        textDecoration: 'underline',
    },
});
export default ThemeTooltip;
