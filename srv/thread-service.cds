using { forum } from '../db/schema';

@path: 'service/thread'
service ThreadService {
    entity Thread as projection on forum.Threads
    entity Answer as projection on forum.Answers;
    entity Author as projection on forum.Authors;
    
    type message {
        code: Integer;
        message: String;
        status: String;
    }
    action deleteThread(ID: String) returns message;
    action upVoteThread(ID: String) returns message;
    action downVoteThread(ID: String) returns message;
}