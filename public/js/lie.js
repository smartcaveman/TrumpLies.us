var Lie = (function(HTMLElement, $, _){
    function Lie(date, statement, falsehood, analysis, category, keywords){
        this.date       = (date||'').trim();
        this.statement  = (statement||'').trim();
        this.falsehood  = (falsehood||'').trim();
        this.analysis   = (analysis||'').trim();
        this.category   = (category||'').trim();
        this.keywords   =  _.chain(keywords || [])
            .filter(function(keyword){ return (keyword != null && keyword.trim().length > 0); })
            .map(function(keyword){ return keyword.trim(); })
            .sort()
            .value()
            .join(', ');
    }

    Lie.fromSpreadsheetEntry = function(entry){
        return new Lie(entry.gsx$date.$t, entry.gsx$statement.$t, entry.gsx$falsething.$t, entry.gsx$analysis.$t, entry.gsx$finalcategory.$t, [entry.gsx$keyword1.$t,entry.gsx$keyword2.$t,entry.gsx$keyword3.$t])
    };

    Lie.fromJson = function(jobject){
        if(typeof jobject.date !== 'string' && jobject instanceof Date) throw new Error('The provided JSON does not contain a valid date.');
        'statement,falsehood,analysis,category'.split(',')
            .forEach(function(requiredString){ if(typeof jobject[requiredString] !== 'string') throw new Error('the provided JSON does not contain a valid ' + requiredString + '.'); });
        return new Lie(jobject.date, jobject.statement, jobject.falsehood, jobject.analysis, jobject.category, jobject.keywords);
    };

    Lie.getHtmlTemplateId = function(){ return 'lie-template'; };

    Lie.prototype.toHtml = function(){
        var templateString = $('template#' + Lie.getHtmlTemplateId()).html();
        return templateString
                .replace(/%statement%/  , this.statement)
                .replace(/%falsehood%/  , this.falsehood)
                .replace(/%analysis%/   , this.analysis)
                .replace(/%category%/   , this.category);
    };


    HTMLElement.prototype.addLieView = function(lie){
        if(lie instanceof Lie){
            this.innerHTML += lie.toHtml();
        } else {
            throw new Error('Missing Lie');
        }
    };

    return Lie;
})(HTMLElement, jQuery, _);