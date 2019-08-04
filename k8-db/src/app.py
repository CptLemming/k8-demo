from flask import Flask, request, jsonify

app = Flask(__name__)


items = [
  {
    'id': 1,
    'label': '20x20 extrusion',
  },
  {
    'id': 2,
    'label': '20x40 extrusion',
  },
  {
    'id': 3,
    'label': '100x100x3mm plate',
  },
  {
    'id': 4,
    'label': '20x20 corner',
  },
]


@app.route("/items", methods=['GET'])
def get_items():
    return jsonify(
        items=items,
    )


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
