from flask import Flask, request, jsonify

app = Flask(__name__)


items = [
  {
    'id': 1,
    'label': '3mm endmill',
  },
  {
    'id': 2,
    'label': '2mm dovetail',
  },
  {
    'id': 3,
    'label': '3mm 90deg engraver',
  },
];


@app.route("/items", methods=['GET'])
def get_items():
    return jsonify(
        items=items,
    )


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
