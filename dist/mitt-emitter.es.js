/**
 * @description Class to pub/sub
 * @class
 */
class MittEmitter {
  constructor(map = new Map()) {
    const self = this;
    self._all = map;
    self._startToRegex = '(\\w*)';
    self._hashToRegex = '(.*\\w*)';
  }

  /**
   * @description Emit event with subtopic
   * @param {!string} topic - topic to send event
   * @param {Any} event - Any value (object is recommended and powerful), passed to each handler
   * @private
   */
  _matchSubTopic(topic, event) {
    const self = this;
    try {
      const topics = [...self._all.keys()]
        .filter(item => item.includes(topic) || item.includes('*') || item.includes('#'));

      const regexTopics = topics.map(item => {
        let regexTopic = item.replace(/[*]/gi, self._startToRegex);
        regexTopic = regexTopic.replace(/[#]/gi, self._hashToRegex);

        return { topic: item, regexTopic };
      });

      const matchTopics = regexTopics.filter(item => {
        const regex = new RegExp(`^${item.regexTopic}`);
        return regex.test(topic);
      });

      matchTopics.forEach(item => {
        const handlers = self._all.get(item.topic);
        handlers.slice().map(handler => handler(event));
      });
    } catch (ex) {
      throw ex;
    }
  }

   /**
   * @description Emit event with match topic
   * @param {!string} topic - topic to send event
   * @param {Any} event - Any value (object is recommended and powerful), passed to each handler
   * @private
   */
  _matchTopic(topic, event) {
    const self = this;
    try {
      const topics = self._all.get(topic) || [];
      topics.slice().map(handler => handler(event));
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @description Register an event handler for the given topic.
   * @param {string|symbol} topic - Is topic to listner
   * @param {function} handler - Function to call in response to given event
   * @public
   */
  on(topic, handler) {
    const self = this;
    try {
      const handlers = self._all.get(topic);
      const added = handlers && handlers.push(handler);
      if (!added) {
        self._all.set(topic, [handler]);
      }
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @description Remove an event handler for the given topic.
   * @param {string|symbol} topic Type of event to unregister `handler` from
   * @public
   */
  off(topic) {
    const self = this;
    try {
      const handlers = self._all.has(topic);
      if (handlers) self._all.delete(topic);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @description Emmit event and data
   * @param {string|symbol} topic - The event topic to invoke
   * @param {Any} event - Any value (object is recommended and powerful), passed to each handler
   * @public
   */
  emit(topic, event) {
    const self = this;
    try {
      const hasSubTopic = topic.includes('.');

      if (hasSubTopic) self._matchSubTopic(topic, event);
      else self._matchTopic(topic, event);

    } catch (ex) {
      throw ex;
    }
  }
}

export default MittEmitter;
