export const QueuePriorities = {
    veryLow: 0,
    low: 1,
    medium: 2,
    high: 3,
    veryHigh: 4,
    urgent: 5,
    timeout: 6
};

export const QueueLimits = {
    [QueuePriorities.veryLow]: 10,
    [QueuePriorities.low]: 20,
    [QueuePriorities.medium]: 30,
    [QueuePriorities.high]: 40,
    [QueuePriorities.veryHigh]: 60,
    [QueuePriorities.urgent]: 240
};


export default QueuePriorities;
