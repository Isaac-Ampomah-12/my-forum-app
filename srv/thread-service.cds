using { forum } from '../db/schema';

service ThreadService  @(path : 'service/thread'){
    entity Thread @(restrict : [
        {
            grant : [ '*' ],
            to : [ 'ForumManager' ]
        }
    ]) as projection on forum.Threads
    entity Answer @(restrict : [
        {
            grant : [ '*' ],
            to : [ 'ForumManager' ]
        }
    ]) as projection on forum.Answers;
    entity Author @(restrict : [
        {
            grant : [ '*' ],
            to : [ 'ForumManager' ]
        }
    ]) as projection on forum.Authors;
    
    type message {
        code: Integer;
        message: String;
        status: String;
    }
    action deleteThread(ID: String) returns message;
    action upVoteThread(ID: String) returns message;
    action downVoteThread(ID: String) returns message;
}