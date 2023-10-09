using { forum } from '../db/schema';

@path: 'service/thread'
service ThreadService {
    entity Thread as projection on forum.Threads
    entity Answer as projection on forum.Answers;
    entity Author as projection on forum.Authors;
}