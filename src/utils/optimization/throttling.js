
// Троттлинг функция для ограничения нагрузки пользовательского ввода по временной задержке
export function throttling(action, durationTick) {
    let inThrottle;
    return (...args) => {
        if(!inThrottle) {
            action.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, durationTick);
        }
    }
}