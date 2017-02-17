angular.module('myApp').run(['$templateCache', function($templateCache) {$templateCache.put('app_client/author/author.view.html','<div class=container><h1 ng-bind=vm.name></h1><label for=search>Search:</label> <input ng-model=vm.q id=search class=form-control placeholder="Filter text"><hr><div dir-paginate="poem in vm.poems|filter:vm.q|itemsPerPage:10"><a ng-bind=poem.title ng-href=/poem/{{poem.title}}></a> <span>{{poem.linecount}}</span></div><dir-pagination-controls max-size=10 direction-links=true boundary-links=true></dir-pagination-controls></div>');
$templateCache.put('app_client/authors/authors.view.html','<div class=container><h1>Authors</h1><label for=search>Search:</label> <input ng-model=vm.q id=search class=form-control placeholder="Filter text"><hr><div dir-paginate="author in vm.authors|filter:vm.q|itemsPerPage:20"><a ng-bind=author ng-href=/author/{{author}}></a></div><dir-pagination-controls max-size=20 direction-links=true boundary-links=true></dir-pagination-controls></div>');
$templateCache.put('app_client/error/404.view.html','<h1>Error</h1>');
$templateCache.put('app_client/home/home.view.html','<div class=main><div class=hero-home><div class=container><div class=row><div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"><div class=hero-home-heading><h1>Retype the greats.</h1><p>Enjoy poetry in a new and unique way, featuring almost <a href=/poems>3000 poems</a> and <a href=/authors>129 authors.</a></p></div></div></div></div></div><div class="container info-wrapper"><div class="row row-centered"><div class="col-xs-3 col-centered info-card"><img src=public/svg/student.svg alt=Relax><h3>Relax</h3><p>Take a break and use our minimalistic interface to enjoy poetry.</p><p>Listen to your own tunes, or listen to the ambient sounds provided!</p></div><div class="col-xs-3 col-centered info-card"><img src=public/svg/ebook.svg alt=Experience><h3>Experience</h3><p>Don\'t just read poems, retain more by retyping and absorbing each line.</p><p>Experience completely new poems by using the <strong>random</strong> feature to generate unique texts!</p></div><div class="col-xs-3 col-centered info-card"><img src=public/svg/vocabulary.svg alt=Learn><h3>Learn</h3><p>Enter the world of poetry by typing along with some of the best, or discover new poems and expand your vocabulary.</p><p>English learners and typists-in-training are welcome to test their skills here too!</p></div></div></div><div class=links-home><div class=container><div class=row></div></div></div></div>');
$templateCache.put('app_client/poem/poem.view.html','<div class=main><div class=hero-poem><div class=container><div class=row><div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"><div class=hero-poem-heading><h1 ng-bind=vm.poem.title></h1><p>by <a ng-href=author/{{vm.poem.author}}>{{vm.poem.author}}</a></p><br><p>{{vm.poemIndex}} / {{vm.poem.lines.length}} lines</p></div></div></div></div></div><div class=poem-section><div class=container-fluid><div class=row><div class="col-sm-4 transcript-wrapper text-center"><h1>Transcript</h1><div class=transcript-text data-simplebar><p ng-repeat="typedLine in vm.typedPoem track by $index" data-simplebar>{{typedLine}}<br ng-if="vm.poem.lines[$index] == false"></p></div></div><div class="col-sm-8 input-wrapper text-center"><div ng-show=vm.done ng-cloak><div class="row row-centered"><button class="flat-button base">Repeat this poem!</button> <button class="flat-button accent">Random a new poem!</button> <button class="flat-button complement">Share this poem!</button></div></div><div ng-repeat="line in vm.poem.lines track by $index"><div ng-if="vm.poemIndex == $index"><textarea class="typed poem-text" type=text ng-model=vm.typedPoem[$index] ng-change="vm.check(vm.typedPoem[$index], $index)" focus-if required></textarea> <textarea class="type poem-text" type=text placeholder={{line}} disabled></textarea></div></div><button ng-click=vm.next()>Next</button></div></div></div></div></div>');
$templateCache.put('app_client/poems/poems.view.html','<div class=container><h1>Poems</h1><label for=search>Search:</label> <input ng-model=vm.q id=search class=form-control placeholder="Filter text"><hr><div dir-paginate="title in vm.titles|filter:vm.q|itemsPerPage:50"><a ng-bind=title ng-href=/poem/{{title}}></a></div><dir-pagination-controls max-size=10 direction-links=true boundary-links=true></dir-pagination-controls></div>');}]);