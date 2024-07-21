// Breadcrumb.js
import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor = theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800];

    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': { backgroundColor: emphasize(backgroundColor, 0.06), },
        '&:active': {boxShadow: theme.shadows[1],
                    backgroundColor: emphasize(backgroundColor, 0.12),
                    },
    };
});


const Breadcrumb = ({ breadcrumbs}) => {
    return (
        <div className="ml-auto d-flex align-items-center">
            <Breadcrumbs aria-label="breadcrumb" className=" breadcrumbs_">
                {breadcrumbs.map((crumb, index) => (
                    <StyledBreadcrumb
                        key={index}
                        component="a"
                        href={crumb.href}
                        label={crumb.label}
                        icon={crumb.icon} />
                ))}
            </Breadcrumbs>
        </div>
    );
};

export default Breadcrumb;
