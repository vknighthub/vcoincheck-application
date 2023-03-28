import { Component } from "react";
import MetisMenu from 'metismenujs';

class MM extends Component {
    componentDidMount() {
        this.$el = this.el;
        this.mm = new MetisMenu(this.$el);

    }
    componentDidUpdate() {
        this.$el = this.el;
        this.mm = new MetisMenu(this.$el);
    }
    componentWillUnmount() {
    }
    render() {
        return (
            <div className="mm-wrapper">
                <ul className="metismenu" ref={(el) => (this.el = el)} >
                    {this.props.children}
                </ul>
            </div>
        );
    }
}
export default MM;
