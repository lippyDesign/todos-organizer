import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import Header from '../components/Header.jsx'

export const MainLayout = ({content}) => (
    
    <div className="main-layout">
        <Header/>
        <main>
            {content}
        </main>
    </div>
)