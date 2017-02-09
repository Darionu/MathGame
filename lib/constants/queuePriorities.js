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
    [QueuePriorities.veryLow]: 5,
    [QueuePriorities.low]: 10,
    [QueuePriorities.medium]: 20,
    [QueuePriorities.high]: 30,
    [QueuePriorities.veryHigh]: 60,
    [QueuePriorities.urgent]: 240
};


export default QueuePriorities;
