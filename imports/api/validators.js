import {Match, check} from 'meteor/check'

export const NonEmptyString = Match.Where(x => {
    check(x, String)
    return x.length > 0
})