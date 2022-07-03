const tickets = [
    {
        name: 'Solo Mitglied',
        value: 28,
        roles:['isMember']
    },
    {
        name: 'Lehrer',
        value: 0,
        roles: ['isInstructor']
    },
    {
        name: 'Tandem Gutschein',
        value: 0,
        roles: ['isTandem']
    },
    {
        name: 'Schüler',
        value: 40,
        roles: ['isStudent']
    }
];

module.exports = { tickets };