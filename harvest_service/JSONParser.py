# -*- coding: utf-8 -*-
import json

from pygraphml import Graph
from pygraphml import Node
from pygraphml import Edge

class JSONParser:
    """
    """

    def __init__(self):
        """
        """

    def write(self, graph, fname):
        """
        """
        f = open(fname, 'w')
        f.write(self.tostring(graph))

    def tostring(self, graph):

        jsonDict = {}

        jsonDict['nodes'] = []
        # Add nodes
        for n in graph.nodes():
            dupcliateFound = False
            for node in jsonDict['nodes']:
                if(node['id'] == n['label']):
                    node['value'] += 1
                    dupcliateFound = True
                    break
            if(False == dupcliateFound):
              jsonDict['nodes'].append({'id':n['label'], 'group':'1', 'value': 1})

        jsonDict['links'] = []

        # Add edges
        for e in graph.edges():
            source = e.node1['label']
            target = e.node2['label']
            dupcliateFound = False
            for edge in jsonDict['links']:
                if(source == edge['source'] and target == edge['target'] or
                    target == edge['source'] and source == edge['target']):
                    edge['value'] += 1
                    dupcliateFound = True
                    break
            if(False == dupcliateFound):
                jsonDict['links'].append({'source':source, 'target':target, 'value':1})
        return json.dumps(jsonDict)


if __name__ == '__main__':
    pass



