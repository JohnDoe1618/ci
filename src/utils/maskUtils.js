import moment from '@/plugins/momentPlugin';

export function formatedDateTimeTemplate(value, template, utcOffset) {
    if(utcOffset) return moment(value)
            .utcOffset(utcOffset)
            .format(template ?? 'HH:mm / DD-MM-YYYY');

    else return moment(value)
        .utcOffset('+03:00')
        .format(template ?? 'HH:mm / DD-MM-YYYY');
}

export function dateFromNow(value) {
    return moment(value).fromNow();
}