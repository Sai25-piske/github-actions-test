from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route("/")
def home():
        return render_template("index.html")


    @app.route("/calculate", methods=["POST"])
    def calculate():
            data = request.get_json()

                num1 = float(data["num1"])
                    num2 = float(data["num2"])
                        operator = data["operator"]

                            if operator == "+":
                                        result = num1 + num2
                                            elif operator == "-":
                                                        result = num1 - num2
                                                            elif operator == "*":
                                                                        result = num1 * num2
                                                                            elif operator == "/":
                                                                                        if num2 == 0:
                                                                                                        return jsonify({"error": "Cannot divide by zero"}), 400
                                                                                                            result = num1 / num2
                                                                                                                else:
                                                                                                                            return jsonify({"error": "Invalid operator"}), 400

                                                                                                                            return jsonify({"result": result})


                                                                                                                        if __name__ == "__main__":
                                                                                                                                app.run(host="0.0.0.0", port=5000, debug=False)
