interface Events {
    [key : string] : any;
}

export function AddEvents(main_events : Events, added_events : Events) {
    for(let event in added_events) {
        if(!main_events[event]) main_events[event] = added_events[event];
    }
}

export default Events;