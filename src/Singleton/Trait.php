<?php
/**
 * @implements Register_Abstract, Singleton_Interface
 */
trait Singleton_Trait {
    /**
     * [instance description]
     * @todo
     * @return $this [description]
     */
    static function instance()
	{
        static $instance;
        if (!$instance) {
            $instance = new static;
        }
        return $instance;
    }
}
