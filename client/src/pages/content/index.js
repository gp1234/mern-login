import React from 'react';
import Home from "../../pages/home/index";
import Trainers from "../../pages/trainers/index";

export default function Index({match}) {

    const contents = {
        home : Home,
        trainers: Trainers
    }
    const Component = contents[match.params.contentId];
    return (
        <Component />
    )
}
