import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../../Utils/Common';
import { NavLink } from "react-router-dom";

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


function Posts(props) {

    let skeleton = [];
    for (let i=0; i<10; i++) {
        skeleton.push(
        <div>
            <div className='d-flex flex-row justify-content-start align-items-center'>
            <Skeleton variant="circular" width={50} height={50} className='col-4 mb-2 mt-4'/>
            <div className='col-8 d-flex flex-column justify-content-end'>
                <Skeleton variant="rectangular" height={10} width={100} className='m-3'/>
                <Skeleton variant="rectangular" height={10} width={200} className='mx-3 '/>
            </div>
            </div>
            <Skeleton variant="rectangular" height={350} />
        </div>
        );
    }

    return (
        <div>
            <div className='container my-4'>
                <div className='row'>
                    <div className='col-12 col-md-6 mx-auto'>
                        <Stack spacing={1}>
                            {skeleton}
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default Posts;