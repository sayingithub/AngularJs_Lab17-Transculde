/**
 * Created by Niyas on 12/12/2016.
 */

// Include all dependencies required for your app in the array
// Here we want to use the SPA, for which we need Route service.
var angularApp = angular.module('angularApp', ['ngRoute']);


// configure the routing part for Single Page Application
angularApp.config(function($routeProvider){

    $routeProvider

        .when('/main',{
            templateUrl: 'pages/main.html',
            controller: 'mainController'
        })

        .when('/second',{
            templateUrl: 'pages/second.html',
            controller: 'secondController'
        })

        // If we want to pass the query string SPA
        .when('/third/:num',{
            templateUrl: 'pages/third.html',
            controller: 'thirdController'
        })


});


angularApp.controller('mainController', ['$scope','$location','$log',function ($scope, $location, $log) {

    $log.info("This is for information from mainController");
    $log.info($location.path()); // returns the string after the # tag

    $scope.name = "Main";

    // to Proof AngularJS services are singletons.
    // AngularJS will create a singleton $log object and all the controllers will have the same copy
    // the $log.main will be overwrite when calling secondController, thirdController
    $log.main = "Property from main";
    $log.first = "Property from MAIN";
    $log.log($log);

    //Model data are sitting in scope and custom directives have the visibility from the parent controller and make use of it.
    //We are using the Custom Directive 'searchResults' in main.html which is in 'mainController'
    //For Example:
    $scope.people = [
        {
        name: 'John Doe',
        address: '111 Main Road, New York',
        phone: '911111111'
        },
        {
            name: 'George Doe',
            address: '222 Main Road, New York',
            phone: '92333333'
        },
        {
            name: 'Jane Doe',
            address: '333 Main Road, New York',
            phone: '933333333'
        }

    ]

   /* $scope.formattedAddress = function(person){
        return person.name + ", " + person.address + ", " + person.phone;
    };*/
}]);

// Writing your own Custom Services
// These custom services are Singleton objects by default
angularApp.service('nameService', function(){
   var self = this;
   this.empname = 'John Doe';
   this.namelength = function(){
      // alert("In NameService.")
       return self.empname.length;
   }
});

// Writing your own Custom Directives
// Purpose of Directives is for reusable object
// In javascript we cannot use the hyphen symbol in the variable as it is treated hyphen as minus sign
// So, in the below example we have given the directive name searchResults in the camel case.
// AngularJS will take the conversion and in html it will use as /look for search-results
// whatever html code in the template will be rendered / replaced in the html when using the searchResults custom directive
angularApp.directive("searchResults", function(){

    // return as javascript object
    return{

        // restrict is one of the Directive's property. we can use directive in Element (<search-results></search-results> or in Attribute (<div search-results></div>)
        // we can use restrict property, so that directive can be restricted to use in Element or Attribute. A stands for Attribute, E stands or Element, C stands for Class, M stands for comments
        // 'AE' is the default setting
        //restrict: 'AE',

        restrict: 'AEC',

        // template is one of other Directive's Property - which contains the html content for reusable purpose where we are usign the same html content in many places
        // Since the html content can grow longer, we can remove the html content and put it in separate html file using the property templateUrl
        //template: '<a href="#" class="list-group-item"><h4 class="list-group-item-heading">Doe, John</h4><p class="list-group-item-text"> 222, Main Toad, SIngapore </p> </a>',

        templateUrl: 'directives/searchresults.html',

        // replace is other Directive's property and default is false. When we use replace as true, then the html output wont's have the <search-results></search-results> tag.
        // Try with both true and false and check the htm content in F12 - developer console
        replace: true,

        // To include one document inside another
        // For example: if we want to display some content inside the custom directive, then we need to use this property
        // default is false
        transclude: true,

        //For Isloating the scope. the same custom directives can be used in different pages for different purpose and the controller may have scope with many different model data and we want to isolate the scope for our own custom directive
        // by using below scope property with empty content like "scope: { }", the person model data in the scope won't be displayed, as we have isloated the scope, so that you can define the required scope which can be used in your searchResults.html
        // In order to display it, need to mention the model field required to display. @ stands for Text binding. Meaning if we want to pass the text use as @. If we need to pass the entire object use "=", Tf we need to pass the function, then use "&" stands for function
        // Text (@) is one way binding and Object (=) is two way binding
        // below personName matches with main.html's person-name and similarly for personAddress
        // Note: the scope - personName and PersonAddress should be matching the custom attrributes defined in the cutsom directives in the htm "main.html"
        scope:{

            // Using Text binding - "@", I want to use only personName and personAddress and not personPhone
            //personName: "@",
            //personAddress: "@"
            //personPhone: "@"

            // Using Object binding - "=". This is 2 way binding. Meaning whatever updates in the "mainController" or in the directives "searchResults" will update the scope.
            // the Custom attribute person-object used in html should be referred in the camelcase in javascript
            personObject: "="

            // Using function - "&"
            // the Custom attribute formatted-address-functionused in html should be referred in the camelcase in javascript
            //formattedAddressFunction: "&"
        }






    }
});