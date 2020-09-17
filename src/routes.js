// @ts-check

const host = '';

export default {
  channelsPath: () => `${host}/api/v1/channels`,
  channelPath: (id) => `${host}/api/v1/channels/${id}`,
  channelMessagesPath: (id) => `${host}/api/v1/channels/${id}/messages`,
};
