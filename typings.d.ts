export interface post {
_createdAt:string;
_id:string;
title:string;
author:{
    name:string;
    image:string;
},
comments : Comment[];
description:string;
body:[object];
slug:{
    current:string;
},
mainImage:{
    asset:{
        url:string;
    };
};
}

export interface Comment{
    approved:boolean;
    comment:string;
    email:string;
    name:string;
    post:{
        _ref:string;
        _type:string;
    };
    _createdAt:string;
    _id:string;
    _type:string;
    _rev:string;
    _updatedAt:string;
}