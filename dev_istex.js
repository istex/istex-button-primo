(function () {
    "use strict";
    'use strict';

	var app = angular.module('centralCustom', ['angularLoad']);

    app.component('prmSearchResultAvailabilityLineAfter', {
			bindings: { parentCtrl: '<' },
			controller: 'prmSearchResultAvailabilityLineAfterController',
			template: '<div class="istex" ng-show="$ctrl.IstexAvail"><p ng-bind-html="$ctrl.IstexAvail"></p></div>'
	});

		// Display in the Brief Display: Controller ISTEX
    app.controller('prmSearchResultAvailabilityLineAfterController', ['$scope','$http', '$q', function($scope,$http,$q){
        //DEBUG console.log(this);
        function getISTEX(doi, title, authorLastName, issn, isbn, date) {
            var url = "";
            if (doi !== "") {
                url = 'https://api.istex.fr/document/openurl?rft_id=info:doi/%22' + doi + '%22&noredirect=1&sid=focus';
            } else if (authorLastName !== "") {
                url = 'https://api.istex.fr/document/openurl?rft.title=%22' + title + '%22&rft.au=%22' + authorLastName + '%22&noredirect=1&sid=focus';
            } else if (issn !== "") {
                url = 'https://api.istex.fr/document/openurl?rft.title=%22' + title + '%22&rft.issn=' + issn + '&noredirect=1&sid=focus';
            } else if (isbn !== "") {
                url = 'https://api.istex.fr/document/openurl?rft.title=%22' + title + '%22&rft.isbn=' + isbn + '&noredirect=1&sid=focus';
            } else if (date !== "") {
                url = 'https://api.istex.fr/document/openurl?rft.title=%22' + title + '%22&rft.date=' + date + '&noredirect=1&sid=focus';
            }
            console.log(url);
            $http.get(url)
            .then(function(response) {
                if (response.data.resourceUrl !== undefined) {
                    var urlIstex = response.data.resourceUrl;
                    urlIstex = urlIstex.match(/^\S[^,]+/ig);
                    $scope.$ctrl.IstexAvail = '<a target="_blank" href=\"' + urlIstex + '\">Accessible via<br><img src="custom/[Name of the package]/img/istex.png" alt="istex icon"></a>';
                }
                else
                {
                    $scope.$ctrl.IstexAvail = false;
                }
            })
            .catch(function(data) {
                $scope.$ctrl.IstexAvail = false;
            });
        }

        function escapeChars(str) {
            return str.replace(/'/g, "%27").replace(/ /g, "%20").replace(/:/g, "%3A").replace(/"/g, "%22");
        };

        var vm = this;
        var pnx = vm.parentCtrl.result.pnx;
        
        var doi = "";
        if(pnx.addata.doi !== undefined) doi = pnx.addata.doi[0];
        else if(pnx.control.sourcerecordid !== undefined) doi = pnx.control.sourcerecordid[0];
        if(!doi.includes(".") || !doi.includes("/") || doi.includes(":")) doi = "";
        
        var title = escapeChars(pnx.display.title[0]) || "";

        var authorLastName = "";
        if(pnx.display.creator !== undefined) authorLastName = pnx.display.creator[0];
        authorLastName = escapeChars(authorLastName.split(",")[0]);

        var issn = "";
        if(pnx.addata.issn !== undefined) issn = pnx.addata.issn[0];
        else if(pnx.search.issn !== undefined) issn = pnx.search.issn[0];

        var isbn = "";
        if(pnx.addata.isbn !== undefined) isbn = pnx.addata.isbn[0];
        else if(pnx.search.isbn !== undefined) isbn = pnx.search.isbn[0];

        var date = "";
        if (pnx.display.creationdate !== undefined)  date = pnx.display.creationdate[0];

        getISTEX(doi, title, authorLastName, issn, isbn, date);
    }]);
})();