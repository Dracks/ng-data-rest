# ng-data

It's a library to replicate the functionality of ember-data in angular 2 & 4, using typescript, and the power of static typo

## Status
The current status is about 40% 

Actually is not usable, pending of some Features

## Usage
on app module providers, set the adapter did you need (Actually only implemented, Django Rest Framework, can you implement to yourself one, using the Adapter abstract class of the lib/core/adapter folder)
```
{ provider: Adapter, useClass: DrfAdapter }
```

Create an object that inherits from ObjectModel like the following
```
@RegisterRest({})
class PersonModel extends ObjectModel{
	@JsonProperty({key: pk})
	id: string

	@JsonProperty({})
	person: string
}
```

It automatically know that it's an named person, and the object contians an id and a person property that are string. It has the method save, to create it or update it. 

To use them, you only need to include RestService autowired object on a controller, and call the method getObject with the name of the Class you need...

For example:
```
var person1=service.getObject(PersonModel);
person1.person="Jaume Singla"
person1.save() // It will create automatically the object, it returns an observable to do the call. 
```


