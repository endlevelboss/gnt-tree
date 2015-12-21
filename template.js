var nametemplate = [ 'namepart1', 'namepart2', 'namepart3', 'namepart4' ];
var nametemplateshort = ['namepart2', 'namepart3'];
var placetemplate = ['placepart1', 'placepart2'];

var christning = [{type:'event', label:'birth', template:placetemplate},
                  {type:'event', label:'christning', template:placetemplate},
                  {type:'role', label:'child', template:nametemplate},
                  {type:'role', label:'father', template:nametemplate},
                  {type:'role', label:'mother', template:nametemplate},
                 ];

var LabelsNOR = {
    // event types
    birth: 'Fødsel',
    christning: 'Dåp',
    
    // roles
    child: 'Barn',
    father: 'Far',
    mother: 'Mor',
    
    // namelabels
    namepart1: 'Tittel',
    namepart2: 'Fornavn',
    namepart3: 'Etternavn',
    namepart4: 'Bostedsnavn',
    placepart1: 'Stedsnavn',
    placepart2: 'Kommune',
    placepart3: 'Fylke',
    placepart4: 'Land',
    
    // other labels
    date: 'Dato',
    place: 'Sted',
}

var LabelsENG = {
    // event types
    birth: 'Birth',
    christning: 'Christning',
    
    // roles
    child: 'Child',
    father: 'Father',
    mother: 'Mother',
    
    // namelabels
    namepart1: 'Title',
    namepart2: 'First name',
    namepart3: 'Last name',
    namepart4: 'Address',
    placepart1: 'Location',
    placepart2: 'Parish',
    placepart3: 'State',
    placepart4: 'Country',
    
    // other labels
    date: 'Date',
    place: 'Place',
}

var Labels = LabelsNOR;
        