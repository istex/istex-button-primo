# Bouton ISTEX dans Primo (NUI)
Code Angular js permettant d'intégrer le bouton ISTEX dans l'outil de découverte Primo (NUI) d'Ex Libris.

## Interrogation de la plateforme ISTEX
La plateforme ISTEX est interrogée avec l'Openurl, sur des critères différents selon les informations disponibles dans les métadonnées :
 - sur le doi
 - sur le titre et le nom de l'autheur
 - sur le titre et ISSN/ISBN
 - sur le titre et la date de publication

## Mise en place
Le code est à copier dans le fichier custom.js présent dans le dossier js du package de la vue ou du CENTRAL_PACKAGE.

### Emplacement sur la page de Primo (NUI)
Il est possible de choisir l'emplacement du bouton sur la page, ici le choix a été fait de l'afficher dans le Brief display :
'''javascript
app.component('prmSearchResultAvailabilityLineAfter', {
			bindings: { parentCtrl: '<' },
			controller: 'prmSearchResultAvailabilityLineAfterController',
			template: '<div class="istex" ng-show="$ctrl.IstexAvail"><p ng-bind-html="$ctrl.IstexAvail"></p></div>'
	});
'''
### Stockage d'une image
Il est possible de stocker une image pour le bouton dans le dossier img du package et ensuite y faire référence de cette manière :
'''html
$scope.$ctrl.IstexAvail = '<img src="custom/[Name of the package]/img/istex.png">
'''


Développé par Camille Mazé et Vincent Thébault, Université Paris-Saclay.
