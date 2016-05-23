import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import Header from '../components/Header.jsx'

export const SecondaryLayout = ({content}) => (
    
    <div className="secondary-layout">
        <Header/>
        <main>
            {content}
        </main>
    </div>
)