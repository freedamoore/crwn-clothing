import React from 'react';
import { connect } from 'react-redux';
import './directory.scss';
import MenuItem from '../menu-item/menu-item';
import { createStructuredSelector } from 'reselect';
import  { selectDirectorySections } from '../../redux/directory/directory.selectors';


const Directory = ({ sections }) => (
    <div className='directory-menu'>
    {/* {
        sections.map(({id, imageUrl, title, size, linkUrl}) => (
            <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} linkUrl={linkUrl}/>
        ))
    } 
    *** THIS CAN BE WRITTEN MORE SIMPLY AS PER BELOW 
    */}
    {
        sections.map(({id, ...otherSectionProps}) => (
            <MenuItem key={id} {...otherSectionProps}/>
        ))
    } 
    </div>
);

const mapStateToProps = createStructuredSelector({ 
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);