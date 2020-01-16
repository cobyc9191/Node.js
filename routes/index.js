var express = require('express');
var router = express.Router();

var loadout = {
    dwarfGear: ['helmet', 'axe', 'boots', 'chestplate'],
    elfGear: ['long flowing hair', 'bow', 'boots', 'leather grieves']
};
var race = {
    dwarf: 'dwarf',
    elf: ' elf'
};
var isEquip = function (gear) {
    if (gear && gear.length) {
        return gear;
    } else {
        return ['Naked'];
    }

};
var personCollection = [
    {
        id: 1,
        first: 'coby',
        last: 'cockerham',
        isEquiped: true,
        race: race.dwarf,
        equiped: isEquip(loadout.dwarfGear),
        age: '67303'

    },
    {
        id: 2,
        first: 'chris',
        last: 'barry',
        isEquiped: true,
        race: race.elf,
        equiped: isEquip(loadout.elfGear),
        age: '67303'

    }];
const achievements = [
    {
        id: 1,
        characterId: 1,
        text: 'chicken chaser',
    },
    {
        id: 2,
        characterId: 2,
        text: 'drunkard',
    },
    {
        id: 3,
        characterId: 1,
        text: 'drunkard',
    },
    {
        id: 4,
        characterId: 2,
        text: 'chicken chaser',
    },
    {
        id: 5,
        characterId: 1,
        text: 'bullet sponge',
    },
    {
        id: 6,
        characterId: 3,
        text: 'nonexsistant',
    },
    {
        id: 7,
        characterId: 2,
        text: 'Raining BLOOOOOOOOOD',
    },
    {
        id: 8,
        characterId: 2,
        text: 'nap time',
    }

];
const isAchieved = function (paramId) {
    let id = +paramId;
    console.log('This is this id passed in: ', id);
    let resource = achievements.filter(item => item.characterId === id);
    console.log('This is the new array: ', resource);
    return resource;
};
const buildTitle = function (characterId) {
    let id = +characterId;
    let resource = personCollection.find(item => item.id === id);
    let title = `Achievements for ${resource.first} ${resource.last}`;
    return title;
};
const updateAchievements = function (characterId) {
    let id = +characterId;
    let resource = achievements.add(id, characterid, text);
    postMessage(resource)
};
const addAchievement = function (item) {
    // find the highest ID associated with each element of the collection
    const highestId = Math.max.apply(Math, achievements.map(function (element) {
        return element.id;
    }));
   
    let newId = 1; // default incase the array is empty

    if (highestId > 0) {
        // generate a new ID based off of the highest existing element ID 
        newId = (highestId + 1);
    }
    console.log('this is the list of achievments for ', achievements.length);
    // make a new object of updated object.   
    let newItem = {
        ...item,
        id: newId,
        characterId: +item.characterId,
        text: item.text
        
    }
    console.log('my new Item is', newItem);
    
    // insert the new item
    achievements.push(newItem);
    console.log('New Element is: ', newItem);
    console.log('this is the list of achievments for ', achievements.length);
    return newId;
};
const deleteRow = function (id) {
    let collectionCount = achievements.length;
    if (collectionCount > 0) {
        //find the index of object from array that you want to delete
        const currentIndex = achievements.findIndex(element => element.id === id);

        //Log count to Console.
        //console.log("Count before deletion: ", data.length);

        // removce from the array
        achievements.splice(currentIndex, 1);
        return collectionCount = achievements.length;
    } else {
        return collectionCount;
    }
};

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/coby', function (req, res, next) {
    res.render('coby', {title: 'Coby Was Here', raz: 'turd nuggets'});
});
router.get('/characters', function (req, res, next) {

    res.render('characters', {title: 'Characters', data: personCollection})
});
router.get('/achievements/:id/', function (req, res, next) {
    let response = isAchieved(req.params.id);
    let characterId = req.params.id;
    res.render('achievements', {data: response, title: buildTitle(req.params.id), characterId: characterId})

});
router.get('/addAchievement', function(req, res,next){
   res.render('addAchievement', {data: personCollection});
    
});
router.post('/addAchievement', function (req, res)
{
    let newAchievement = {
        characterId: req.body.characterId,
        text: req.body.achievementName
    };
    let url =`/achievements/${newAchievement.characterId}`;
    let id = addAchievement(newAchievement);
    res.redirect(url);
    
});
router.post('/deleteAchievements', (req, res, next) => {
    let achievementId = req.body.achievementId;
    let characterId= req.body.characterId;
    let count = deleteRow(achievementId);
    let url =`/achievements/${characterId}`;
    res.redirect(url);
});

module.exports = router;
