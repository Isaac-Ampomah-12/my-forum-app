namespace forum;
using { managed } from '@sap/cds/common';

entity Threads : managed {
    key ID      : UUID @(Core.Computed : true);
    author      : Association to Authors;
    answers     : Association to many Answers on answers.thread = $self; 
    title       : String(15);
    content     : String(100);
    upvotes     : Integer;
    downvotes   : Integer;
    updatedAt   : DateTime
}

entity Authors {
    key ID  : UUID @(Core.Computed : true);
    name    : String(20);
    threads  : Association to many Threads on threads.author = $self;
    answers : Association to many Answers on answers.author = $self;
}

entity Answers : managed {
    key ID      : UUID @(Core.Computed : true);
    author      : Association to Authors;
    thread     : Association to Threads;
    content     : String;
    deleted     : Boolean default false;
    updatedAt   : DateTime
}


