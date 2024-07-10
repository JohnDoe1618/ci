import { formatedDateTimeTemplate, dateFromNow } from "@/utils/maskUtils"

// Сервис предоставляет процедуры форматирования структрных и примитивных типов данных
export default class PatternService {
    /**
        @description 
        Функция форматирует дату и время по некоторому шаблону template. 
        Шаблон можно указать в качестве аргумента
        @param
        [value] - дата в виде строки либо в unix-формате. Пример: 1720125319212 ###
        @param
        [template] - шаблон по которому будет отформатирована дата Пример: "HH:mm:ss DD/MM/YY"
        @param
        [utcOffset] - смещение часового пояса. Пример: "+03:00"
    */
    static formattedDateTime(value, template, utcOffset) {
        return formatedDateTimeTemplate(value, template, utcOffset);
    }

    /**
        @description 
        Функция вычисляет количество прощедшего времени с момента того времени
        которое было передано ей в качестве аргумента
        @param
        [value] - дата в виде строки либо в unix-формате. Пример: 1720125319212 
    */
    static computeDateTimeFromNow(value) {
        return dateFromNow(value);
    }

    /**
        @description 
        Функция форматирует строку меняя пробелы на минусы ("-"). 
        Также меняется регистр на нижний.
        @param
        [text] - строка которая будет отформатирована
        @returns
        Возвращает отформатированную строку. Если переданы неверные данные, то будет возвращено null
    */
    static replaceStringByKebab(text) {
        if(!text || typeof text !== 'string') {
            return null;
        }
        return text.toLowerCase().split(' ').join('-');
    }
}